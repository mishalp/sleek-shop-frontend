import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import FormInput from "@/components/formInput/FormInput";
import { useCreateCouponMutation } from "@/app/services/coupon"
import { useSellerVerifyQuery } from "@/app/services/seller"

const formSchema = z.object({
    name: z.string().min(3, {
        message: "Name must be at least 3 characters"
    }),
    minValue: z.coerce.number({
        invalid_type_error: "Mininum price must be number"
    }).finite().safe(),
    maxValue: z.coerce.number({
        invalid_type_error: "Maximum price must be number"
    }).finite().safe(),
    discount: z.coerce.number({
        invalid_type_error: "Discount must be number"
    }).finite().min(1).max(100).safe(),

})

export default function AddCoupenForm({ btnRef }) {

    const [createCoupon, { isLoading }] = useCreateCouponMutation()
    const { data } = useSellerVerifyQuery()
    const { toast } = useToast()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            minValue: null,
            maxValue: null,
            discount: "",
        },
    })

    const onSubmit = async (values) => {
        try {
            console.log(values);
            const res = await createCoupon({ ...values, shopId: data.user._id }).unwrap()

            toast({
                title: "Success",
                description: res.message,
                variant: "success",
            })

            console.log(btnRef);
            btnRef.current?.click()
        } catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Something went wrong",
                description: error.data.message,
            })
        }
    }
    return (
        <Form {...form}>
            <form >
                <div className="gap-4 grid grid-cols-1 xl:grid-cols-2">
                    <FormInput form={form} name="name" label="Name" />
                    <FormInput form={form} name="discount" label="Discount(%)" type="number" min={0} max={100} />
                    <FormInput form={form} name="minValue" label="Min Price" min={1} type="number" />
                    <FormInput form={form} name="maxValue" label="Max Price" min={form.watch('minValue')} type="number" />
                </div>
                <Button onClick={form.handleSubmit(onSubmit)} disabled={isLoading} className="mt-3 w-full bg-mytertiory">
                    {isLoading ? <><ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please wait</> : "Submit"}
                </Button>
            </form>
        </Form>
    )
}
