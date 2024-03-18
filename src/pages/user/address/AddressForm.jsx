import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import FormInput from "@/components/formInput/FormInput";
import { Country, State } from "country-state-city";
import validator from "validator"
import { useAddAddressMutation } from "@/app/services/user"

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


export default function AddressForm({ btnRef }) {

    const [addAddress, { isLoading }] = useAddAddressMutation()
    const { toast } = useToast()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullname: "",
            email: "",
            phone: "",
            zip: "",
            country: "",
            state: "",
            address: ""
        },
    })

    const onSubmit = async (values) => {
        try {
            console.log(values);
            const res = await addAddress(values).unwrap()
            toast({
                title: "Success",
                description: res.message,
                variant: "success",
            })

            btnRef.current.click()
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
                    <FormInput form={form} name="fullname" label="Full Name" />
                    <FormInput form={form} name="phone" label="Phone" />
                    <FormInput form={form} name="zip" label="Zip code" />
                    <FormInput
                        form={form}
                        name="country"
                        type="select"
                        list={Country?.getAllCountries().map(item => ({ value: item.isoCode, name: item.name }))}
                        label="Country"
                    />
                    <FormInput
                        form={form}
                        name="state"
                        type="select"
                        list={State?.getStatesOfCountry(form.watch('country')).map(item => ({ value: item.isoCode, name: item.name }))}
                        label="State"
                    />
                    <FormInput form={form} name="address" label="Address" />
                </div>
                <Button onClick={form.handleSubmit(onSubmit)} disabled={isLoading} className="mt-3 w-full bg-mytertiory">
                    {isLoading ? <><ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please wait</> : "Submit"}
                </Button>
            </form>
        </Form>
    )
}
