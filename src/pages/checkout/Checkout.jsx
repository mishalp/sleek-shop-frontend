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


const formSchema = z.object({
    email: z.string({
        required_error: "Email is required"
    }).trim().email({
        message: "Enter a valid Email"
    }),
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
    const prevValues = JSON.parse(localStorage.getItem('order'))

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullname: prevValues ? prevValues.fullname : "",
            email: prevValues ? prevValues.email : "",
            phone: prevValues ? prevValues.phone : "",
            zip: prevValues ? prevValues.zip : "",
            country: prevValues ? prevValues.country : "",
            state: prevValues ? prevValues.state : "",
            address: prevValues ? prevValues.address : ""
        },
    })

    const gotoPayment = (values) => {
        localStorage.setItem("order", JSON.stringify(values))
        navigate('/payment')
    }

    return (
        <div className='w-screen max-w-full bg-myprimary'>
            <Header />
            <div className="gap-8 p-4 py-8 pt-32 flex flex-col items-center">
                <CheckoutBar active={1} />
                <div className="flex gap-4 items-center">
                    <ShippingInfo form={form} />
                    <CartData />
                </div>
                <button className='px-16 py-3 bg-mysecondary text-xl text-white rounded-md font-semibold' onClick={form.handleSubmit(gotoPayment)}>Go to Payment</button>
            </div>
            <Footer />
        </div>
    )
}