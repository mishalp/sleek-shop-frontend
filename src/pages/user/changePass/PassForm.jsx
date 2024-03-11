import { useChangeUserPassMutation } from "@/app/services/user"
import FormInput from "@/components/formInput/FormInput"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/components/ui/use-toast"
import { ReloadIcon } from "@radix-ui/react-icons"

const formSchema = z.object({
    password: z.string().min(6, {
        message: "Password must be at least 6 characters"
    }),
    newPassword: z.string().min(6, {
        message: "Password must be at least 6 characters"
    }),
})

export default function PassForm() {

    const [updatePass, { isLoading }] = useChangeUserPassMutation()
    const { toast } = useToast()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            newPassword: ""
        },
    })

    const onSubmit = async (values) => {
        try {
            if (values.password === values.newPassword) {
                return toast({
                    variant: "destructive",
                    title: "Use new Password",
                })
            }
            const res = await updatePass(values).unwrap()
            toast({
                variant: "success",
                title: res.message,
            })
            form.reset({ newPassword: "", password: "" })
        } catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Error",
                description: error.data.message || "",
            })
        }
    }

    return (
        <div className="container py-10 bg-myprimary flex flex-col justify-center gap-5 items-center p-4">
            <div className="bg-white p-6 lg:min-w-[34rem] flex flex-col gap-6 shadow rounded">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="gap-4 flex flex-col">
                        <FormInput form={form} name="password" label="Current Password" type="password" />
                        <FormInput form={form} name="newPassword" label="New Password" type="password" />

                        <Button disabled={isLoading} className="mt-3 bg-mytertiory" type="submit">
                            {isLoading ? <><ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please wait</> : "Submit"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
