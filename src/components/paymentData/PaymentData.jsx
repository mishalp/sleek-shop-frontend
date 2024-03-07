import FormInput from "../formInput/FormInput";
import { Form, FormControl, FormItem, FormLabel } from "../ui/form";
import { CardCvcElement, CardExpiryElement, CardNumberElement } from "@stripe/react-stripe-js";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Coins } from "lucide-react";
// import { HandCoins } from "lucide-react";

export default function PaymentData({ form, setType, type }) {

    return (
        <div className=" bg-myprimary flex flex-col justify-center gap-4 items-center p-4">
            <div className="flex justify-start gap-4 w-full">
                <RadioGroup onValueChange={(value) => setType(value)} defaultValue="card" >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card">Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cod" id="cod" />
                        <Label htmlFor="cod">Cash on delivary</Label>
                    </div>
                </RadioGroup>

            </div>
            <div className="bg-white p-6 lg:min-w-[35rem] xl:min-w-[45rem] flex flex-col gap-6 shadow rounded">
                {type === 'card' ? (
                    <Form {...form}>
                        <form >
                            <div className="gap-4 grid grid-cols-2">
                                <FormInput form={form} name="fullname" label="Name on card" />
                                <Payform label="Expiry Date">
                                    <CardExpiryElement
                                        className="focus-visible:ring-1 !ring-offset-0 !ring-mytertiory h-10 px-3 py-2 text-sm ring-offset-background border rounded border-input"
                                    />
                                </Payform>
                                <Payform label="Card Number">
                                    <CardNumberElement
                                        className="focus-visible:ring-1 !ring-offset-0 !ring-mytertiory h-10 px-3 py-2 text-sm ring-offset-background border rounded border-input"
                                    />
                                </Payform>
                                <Payform label="CVC">
                                    <CardCvcElement
                                        className="focus-visible:ring-1 !ring-offset-0 !ring-mytertiory h-10 px-3 py-2 text-sm ring-offset-background border rounded border-input"
                                    />
                                </Payform>
                            </div>
                        </form>
                    </Form>
                ) : (
                    <div className="flex items-center gap-4 justify-center">
                        <Coins /> <h2 className="text-xl font-semibold">Cash on Delivary</h2>
                    </div>
                )}
            </div>
        </div>
    )
}

function Payform({ children, label }) {
    return (
        <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
                {children}
            </FormControl>
        </FormItem>
    )
}