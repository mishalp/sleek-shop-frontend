import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import validator from "validator";
import { ReloadIcon } from "@radix-ui/react-icons"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useState } from "react";
import getFileData from "@/utils/getFileData";
import FormInput from "@/components/formInput/FormInput";
import { Link } from "react-router-dom";
import { useSellerRegisterMutation } from "@/app/services/seller";

const formSchema = z.object({
    name: z.string({
        required_error: "Shope name is required"
    }).min(2, {
        message: "Shope name must be at least 2 characters.",
    }).max(20, {
        message: "Shope name must be at most 20 characters"
    }),
    phone: z.string()
        .min(10, {
            message: "Phone must be at least 10 numbers."
        }).refine((val) => validator.isMobilePhone(val, 'en-IN'), {
            message: "Phone must be numeric"
        }),
    email: z.string({
        required_error: "Email is required"
    }).trim().email({
        message: "Enter a valid Email"
    }),
    address: z.string().min(3, {
        message: "Adress must be at least 3 characters"
    }),
    zip: z.string().min(6, {
        message: "Zip code must be at least 6 numbers"
    }).refine(validator.isNumeric, {
        message: "Zip code must be numeric"
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters"
    }),
    avatar: z
        .any()
        .refine((file) => file, "Image is required.")
        .refine((file) => file?.size <= 500000, `Max file size is 5MB.`)
        .refine(
            (file) => ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file?.type),
            ".jpg, .jpeg, .png and .webp files are accepted."
        ),
})


function SellerSignUp() {

    const [loading, setLoading] = useState(false)
    const { toast } = useToast()
    const [register] = useSellerRegisterMutation()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            address: "",
            zip: "",
            password: "",
            avatar: "",
        },
    })

    async function onSubmit(values) {
        setLoading(true)
        try {
            let avatar = await getFileData(values.avatar)
            const data = {
                ...values,
                avatar: avatar
            }
            console.log(data);
            const res = await register(data).unwrap()
            toast({
                title: "Email sent successfully",
                description: res.message,
                variant: "success",
            })

        } catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: error.data.message,
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-screen max-w-full min-h-screen bg-myprimary flex flex-col justify-center items-center p-4">
            <h2 className="text-2xl font-bold font-popins my-8">Register as a Seller</h2>
            <div className="bg-white p-6 lg:min-w-[34rem] flex flex-col gap-6 shadow rounded">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="gap-4 flex flex-col">
                        <FormInput form={form} name="name" label="Shop name" />
                        <FormInput form={form} name="phone" label="Phone" />
                        <FormInput form={form} name="email" label="Email" type="email" />
                        <FormInput form={form} name="address" label="Address" />
                        <FormInput form={form} name="zip" label="Zip code" />
                        <FormInput form={form} name="password" label="Password" type="password" />
                        <FormInput form={form} name="avatar" label="Avatar" type="image" />

                        <Button disabled={loading} className="mt-3 bg-mytertiory" type="submit">
                            {loading ? <><ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please wait</> : "Submit"}
                        </Button>
                    </form>
                </Form>
                <p className="text-sm">Already have an account? <Link className="text-blue-500 font-popins" to='/seller/login'>Log in</Link></p>
            </div>
        </div>
    )
}

export default SellerSignUp