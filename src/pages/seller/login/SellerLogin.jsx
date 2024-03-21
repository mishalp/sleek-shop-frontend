import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import FormInput from "@/components/formInput/FormInput";
import { Link, useNavigate } from "react-router-dom";
import { useSellerLoginMutation } from "@/app/services/seller"
import { useDispatch } from "react-redux"
import { setSellerToken } from "@/app/features/auth"
import authBg from '@/assets/images/bg.svg'

const formSchema = z.object({
    email: z.string({
        required_error: "Email is required"
    }).trim().email({
        message: "Enter a valid Email"
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters"
    }),
})


function SellerLogin() {
    const { toast } = useToast()
    const [login, { isLoading }] = useSellerLoginMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values) {
        try {
            const data = await login(values).unwrap()
            localStorage.setItem("sleek_seller_token", JSON.stringify(data.token))
            dispatch(setSellerToken(data.token))
            toast({
                title: "Login Success",
                variant: "success"
            })
            navigate("/seller/dashboard")
        } catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: error.data.message,
            })
        }
    }

    return (
        <div style={{ backgroundImage: `url(${authBg})` }} className="w-screen bg-fixed max-w-full min-h-screen bg-myprimary flex flex-col justify-center items-center p-4">
            <h2 className="text-2xl text-white font-bold font-popins my-8">Login to your shop</h2>
            <div className="bg-white p-6 lg:min-w-[26rem] flex flex-col gap-6 shadow rounded">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="gap-4 flex flex-col">
                        <FormInput form={form} name="email" label="Email" type="email" />
                        <FormInput form={form} name="password" label="Password" type="password" />
                        <Button disabled={isLoading} className="mt-3 bg-mytertiory" type="submit">
                            {isLoading ? <><ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please wait</> : "Submit"}
                        </Button>
                    </form>
                </Form>
                <p className="text-sm">Not have any account? <Link className="text-blue-500 font-popins" to='/auth/seller/signup'>Sign Up</Link></p>
            </div>
        </div>
    )
}

export default SellerLogin