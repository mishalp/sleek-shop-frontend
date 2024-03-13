import CheckoutBar from '@/components/checkoutBar/CheckoutBar'
import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import ShippingInfo from '@/components/shippingInfo/ShippingInfo'
import validator from "validator"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CartData } from '@/components/cartData/CartData'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useUserVerifyQuery } from '@/app/services/user'


const formSchema = z.object({
    fullname: z.string().min(3, {
        message: "Full name must be at least 3 characters"
    }),
    phone: z.string()
        .min(10, {
            message: "Phone must be at least 10 numbers."
        }).refine((val) => validator.isMobilePhone(val, 'en-IN'), {
            message: "Phone must be valid"
        }),
    address: z.string().min(3, {
        message: "Adress must be at least 3 characters"
    }),
    zip: z.string().min(6, {
        message: "Zip code must be at least 6 numbers"
    }).refine(validator.isNumeric, {
        message: "Zip code must be numeric"
    }),
    country: z.string().min(1, {
        message: 'Select a Country'
    }),
    state: z.string().min(1, {
        message: 'Select a State'
    })
})


export default function Checkout() {

    const navigate = useNavigate()
    const prevValues = JSON.parse(localStorage.getItem('shipping'))
    const cart = useSelector(state => state.cart)
    const { data, isLoading: userLoading, isError: userError } = useUserVerifyQuery()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullname: prevValues ? prevValues.fullname : "",
            phone: prevValues ? prevValues.phone : "",
            zip: prevValues ? prevValues.zip : "",
            country: prevValues ? prevValues.country : "",
            state: prevValues ? prevValues.state : "",
            address: prevValues ? prevValues.address : ""
        },
    })

    useEffect(() => {
        if (!cart.isloading && cart.cart.length === 0) {
            navigate('/')
        }
    }, [cart])

    const gotoPayment = (values) => {

        localStorage.setItem("shipping", JSON.stringify(values))
        navigate('/payment')
    }

    const selectAddress = (value) => {
        const address = data.user.addresses[value]
        form.setValue("fullname", address.fullname)
        form.setValue("phone", address.phone)
        form.setValue("zip", address.zip)
        form.setValue("country", address.country)
        form.setValue("state", address.state)
        form.setValue("address", address.address)
    }

    if (cart.isloading) return null

    return (
        <div className='w-screen max-w-full bg-myprimary'>
            <Header />
            <div className="gap-8 p-4 py-8 pt-32 flex flex-col items-center">
                <CheckoutBar active={1} />
                <div className="flex flex-col gap-4">
                    <div className="flex gap-4 items-center justify-center">
                        <ShippingInfo form={form} />
                        <CartData />
                    </div>
                    {!userError && !userLoading && data.user.addresses.length > 0 &&
                        <Select onValueChange={selectAddress}>
                            <SelectTrigger className="w-fit">
                                <SelectValue placeholder="Choose from saved Addresses" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {data.user.addresses.map((item, i) => (
                                        <SelectItem value={i}>
                                            <div key={i} className="gap-4 flex items-center">
                                                <p className="font-semibold">{item.fullname}</p>
                                                <p>{item.address}</p>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>}
                </div>
                <button className='px-16 py-3 bg-mysecondary text-xl text-white rounded-md font-semibold' onClick={form.handleSubmit(gotoPayment)}>Go to Payment</button>
            </div>
            <Footer />
        </div>
    )
}