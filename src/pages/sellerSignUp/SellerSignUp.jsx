import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import validator from "validator";
import { EyeNoneIcon, EyeOpenIcon, ReloadIcon } from "@radix-ui/react-icons"
import avatar from '@/assets/icons/avatar.svg'

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { MyInput } from "@/components/ui/input"
import { useState } from "react";
import axios from "axios";
import getFileData from "@/utils/getFileData";

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
    const [show, setShow] = useState(false)
    const [dp, setDp] = useState(null)

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
        console.log(values)
        console.log(import.meta.env.VITE_SERVER);
        setLoading(true)
        let avatar = await getFileData(values.avatar)
        const data = {
            ...values,
            avatar: avatar
        }
        const URL = `${import.meta.env.VITE_SERVER}/shop/register`
        try {
            const res = await axios.post(URL, data);
            console.log(res.data);


        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    const handleFileInput = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setDp(reader.result)
            }
        }

        reader.readAsDataURL(e.target.files[0])
        form.setValue("avatar", e.target.files[0])
    }

    return (
        <div className="w-screen max-w-full min-h-screen bg-myprimary flex flex-col justify-center items-center p-4">
            <h2 className="text-2xl font-bold font-popins my-8">Register as a Seller</h2>
            <div className="bg-white p-4 lg:min-w-[34rem] flex flex-col shadow rounded">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} encType="multipart/form-data" className="gap-4 flex flex-col">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Shop name</FormLabel>
                                    <FormControl>
                                        <MyInput field={field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <MyInput type="text" field={field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <MyInput type="email" field={field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <MyInput type="text" field={field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="zip"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel>Zip code</FormLabel>
                                    <FormControl>
                                        <MyInput type="text" field={field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="relative" >
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <>
                                            <div className="relative">
                                                <MyInput type={show ? "text" : "password"} field={field} />
                                                {show ?
                                                    <EyeOpenIcon onClick={() => setShow(false)} className="absolute bottom-3 scale-[1.2] cursor-pointer right-2" />
                                                    : <EyeNoneIcon onClick={() => setShow(true)} className="absolute bottom-3 scale-[1.2] cursor-pointer right-2" />}
                                            </div>
                                        </>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="avatar"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel>Avatar</FormLabel>
                                    <FormControl >
                                        <div className="flex items-center gap-8 relative">
                                            <img src={dp ? dp : avatar} className="w-7 aspect-square object-cover rounded-full" alt="" />
                                            {/* <MyInput type="file" onChange={() => console.log("hi")} id="avatar" className="sr-only" field={field} /> */}
                                            <input
                                                type="file"
                                                className="sr-only"
                                                onChange={handleFileInput}
                                                id="avatar"
                                            />
                                            <label htmlFor="avatar" className="text-sm cursor-pointer ring-0 rounded-md py-2 px-5 border border-input">Upload photo</label>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={loading} className="mx-auto mt-3 bg-mytertiory" type="submit">
                            {loading ? <><ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please wait</> : "Submit"}
                        </Button>
                    </form>
                </Form>
            </div>

        </div>
    )
}

export default SellerSignUp