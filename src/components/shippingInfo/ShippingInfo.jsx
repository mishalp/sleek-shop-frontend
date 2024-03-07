import { Form } from "@/components/ui/form"
import FormInput from "@/components/formInput/FormInput";
import { Country, State } from "country-state-city";

export default function ShippingInfo({ form }) {

    return (
        <div className=" bg-myprimary flex flex-col justify-center items-center p-4">
            <h2 className="text-xl font-bold font-popins my-2">Shipping Address</h2>
            <div className="bg-white p-6 lg:min-w-[35rem] xl:min-w-[45rem] flex flex-col gap-6 shadow rounded">
                <Form {...form}>
                    <form >
                        <div className="gap-4 grid grid-cols-2">
                            <FormInput form={form} name="fullname" label="Full Name" />
                            <FormInput form={form} name="email" label="Email" type="email" />
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
                    </form>
                </Form>
            </div>
        </div>
    )
}
