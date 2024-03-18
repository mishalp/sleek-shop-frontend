import CheckoutBar from '@/components/checkoutBar/CheckoutBar'
import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import { CartData } from '@/components/cartData/CartData'
import { useNavigate } from 'react-router-dom'
import PaymentData from '@/components/paymentData/PaymentData'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect, useState } from 'react'
import { useStripe, useElements, CardNumberElement } from '@stripe/react-stripe-js';
import { useCreateIntentMutation } from '@/app/services/payment'
import { useDispatch, useSelector } from 'react-redux'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useToast } from '@/components/ui/use-toast'
import { useCreateOrderMutation } from '@/app/services/order'
import { useSetCartMutation } from '@/app/services/cart'
import { setCart } from '@/app/features/cart'
import { useUserVerifyQuery } from '@/app/services/user'
import { CheckCircle2 } from 'lucide-react'

const formSchema = z.object({
    name: z.string().min(3, {
        message: "Full name must be at least 3 characters"
    }),
})

export default function Payment() {

    const navigate = useNavigate()
    const stripe = useStripe();
    const elements = useElements();
    const { toast } = useToast()
    const dispatch = useDispatch()

    const [type, setType] = useState("card")
    const [active, setActive] = useState(2)
    const [loading, setLoading] = useState(false)
    const { data } = useUserVerifyQuery()

    const prevValues = JSON.parse(localStorage.getItem('shipping'))
    const [createIntent] = useCreateIntentMutation()
    const [createOrder] = useCreateOrderMutation()
    const [setCartItem] = useSetCartMutation()
    const cart = useSelector(state => state.cart.cart)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: prevValues ? prevValues.fullname : "",
        },
    })

    useEffect(() => {
        if (!prevValues) navigate('/checkout')
        if (cart.length === 0) navigate('/')
    }, [])

    const submit = async () => {
        try {
            setLoading(true)
            let total = cart?.reduce((total, prod) => total + (prod.item.price * prod.count), 0)
            if (type === "card") {
                const res = await createIntent(total).unwrap()
                const client_secret = res.clientSecret
                console.log(elements);
                if (!stripe || !elements) return
                console.log('started');
                console.log(elements.getElement(CardNumberElement));
                const result = await stripe.confirmCardPayment(client_secret, {
                    payment_method: {
                        card: elements.getElement(CardNumberElement),
                    },
                })

                console.log('hi');

                if (result.error) {
                    console.log(result.error);
                    toast({
                        variant: "destructive",
                        title: "Payment Error",
                        description: result.error.message,
                    })
                } else {
                    if (result.paymentIntent.status === "succeeded") {
                        let orderData = {
                            user: {
                                name: data.user.name,
                                email: data.user.email,
                                id: data.user._id
                            },
                            cart: cart.map(prod => ({
                                item: {
                                    ...prod.item,
                                    shop: prod.item.shop._id || prod.item.shop
                                },
                                count: prod.count
                            })),
                            shippingAddress: prevValues,
                            totalPrice: total,
                            paymentInfo: {
                                id: result.paymentIntent.id,
                                status: result.paymentIntent.status,
                                type: "Credit Card",
                            }
                        }
                        await createOrder(orderData).unwrap()
                        await setCartItem([]).unwrap()
                        dispatch(setCart({ cart: [], user: true }))
                        toast({
                            title: "Order placed successfull",
                            variant: "success",
                        })
                        setActive(3)
                    }
                }
            } else {
                let orderData = {
                    user: {
                        name: data.user.name,
                        email: data.user.email,
                        id: data.user._id
                    },
                    cart: cart.map(prod => ({
                        item: {
                            ...prod.item,
                            shop: prod.item.shop._id || prod.item.shop
                        },
                        count: prod.count
                    })),
                    shippingAddress: prevValues,
                    totalPrice: total,
                    paymentInfo: {
                        type: "Cash on delivery",
                    }
                }
                await createOrder(orderData).unwrap()
                await setCartItem([]).unwrap()
                dispatch(setCart({ cart: [], user: true }))
                toast({
                    title: "Order placed successfull",
                    variant: "success",
                })
                setActive(3)
            }
        } catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Payment Error",
                description: error?.message,
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='w-screen max-w-full bg-myprimary'>
            <Header />
            <div className="gap-8 p-4 py-8 pt-32 flex flex-col items-center">
                <CheckoutBar active={active} />
                {active === 2 ? (
                    <>
                        <div className="grid max-md:grid-cols-1 grid-cols-[auto,auto] gap-4 items-center">
                            <PaymentData type={type} setType={setType} form={form} />
                            <CartData />
                        </div>
                        <button onClick={submit} disabled={loading} className="mt-3 items-center flex bg-mysecondary disabled:opacity-50 px-16 py-3 text-xl text-white rounded-md font-semibold" type="submit">
                            {loading ? <><ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please wait</> : "Submit"}
                        </button>
                    </>
                ) : (
                    <div className="min-h-[calc(100vh-16rem)] flex pt-32">
                        <div className="flex h-fit items-center gap-2">
                            <CheckCircle2 size={38} color='green' />
                            <p className='text-xl font-semibold'>Success</p>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
}
