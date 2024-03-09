import { useUserVerifyQuery } from "@/app/services/user"
import FormInput from "@/components/formInput/FormInput"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
    name: z.string({
        required_error: "Shope name is required"
    }).min(2, {
        message: "Shope name must be at least 2 characters.",
    }).max(20, {
        message: "Shope name must be at most 20 characters"
    }),
    email: z.string({
        required_error: "Email is required"
    }).trim().email({
        message: "Enter a valid Email"
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters"
    }),
    avatar: z
        .any()
        .refine((file) => file.size ? file.size <= 100000 : true, `Max file size is 1MB.`)
        .refine(
            (file) => file.type ? ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file?.type) : true,
            ".jpg, .jpeg, .png and .webp files are accepted."
        ),
})

export default function ProfileForm() {

    const { data, isLoading: userLoading, isError: userError } = useUserVerifyQuery()

    if (userLoading || userError) return null

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: data.user.name,
            email: data.user.email,
            password: "",
            avatar: data.user.avatar.url,
        },
    })
    let loading;

    const onSubmit = () => {

    }

    return (
        <div className="container py-10 bg-myprimary flex flex-col justify-center gap-5 items-center p-4">
            <img src={data.user.avatar.url} className="w-32 aspect-square rounded-full object-cover" alt="" />
            <div className="bg-white p-6 lg:min-w-[34rem] flex flex-col gap-6 shadow rounded">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="gap-4 flex flex-col">
                        <FormInput form={form} name="name" label="Name" />
                        <FormInput disabled form={form} name="email" label="Email" type="email" />
                        <FormInput form={form} name="password" label="Password" type="password" />
                        <FormInput form={form} name="avatar" label="Avatar" type="image" />

                        <Button disabled={loading} className="mt-3 bg-mytertiory" type="submit">
                            {loading ? <><ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please wait</> : "Submit"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
