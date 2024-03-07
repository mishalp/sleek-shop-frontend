import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/utils/utils";
import { Country, State } from "country-state-city";
import { useState } from "react";

export default function OrderDetails({ order }) {

    if (!order) return <p>loading</p>

    return (
        <div className="flex flex-col gap-8">
            <p className="opacity-60">Order Id: #{order._id}</p>
            <OrderUpdater order={order} />
            <div className="flex flex-col gap-8">
                {order.cart.map((item, index) => (
                    <div key={index} className="grid grid-cols-[5rem,1fr,auto] items-center gap-4">
                        <img src={item.images[0].url} className='w-20 aspect-square object-contain mix-blend-multiply' alt="" />
                        <div className="flex flex-col gap-2">
                            <p className="text-lg">{item.name}</p>
                            <p className="text-sm">{item.category}</p>
                        </div>
                        <div className="flex">
                            <p>{formatPrice(item.price)} x {item.qty} = {formatPrice(item.price * item.qty)}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Separator />
            <p className="text-right font-semibold">Total: {formatPrice(order.totalPrice)}</p>
            <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-2">
                    <p className="font-semibold">Shipping Address: </p>
                    <p>{order.shippingAddress.fullname}</p>
                    <p>{order.shippingAddress.address}</p>
                    <p>{order.shippingAddress.zip}</p>
                    <p>{State.getStateByCodeAndCountry(order.shippingAddress.state, order.shippingAddress.country).name}, {Country.getCountryByCode(order.shippingAddress.country).name}</p>
                    <p>{order.shippingAddress.phone}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="font-semibold">Payment Info: </p>
                    <p>Status: {order.paymentInfo?.status ? order.paymentInfo.status : "Not Paid"}</p>
                </div>
            </div>
        </div>
    )
}

let status = [
    "Processing",
    "Transferred to delivery partner",
    "Shipping",
    "Recieved",
    "On the way",
    "Delivered"

]

function OrderUpdater({ order }) {
    const [value, setValue] = useState(order.status)
    const handleUpdate = async () => {
        if (order.status === value) return
        alert(value)
    }
    return (
        <div className="flex flex-col gap-2">
            <p className="font-semibold">Order status:</p>
            <div className="flex gap-2">
                <Select onValueChange={(v) => setValue(v)} value={value} defaultValue={value}>
                    <SelectTrigger>
                        <SelectValue placeholder={value} />
                    </SelectTrigger>
                    <SelectContent>
                        {status.map((item, i) => (
                            <SelectItem key={i} value={item}>{item}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button disabled={order.status === value} onClick={handleUpdate}>Update</Button>
            </div>
        </div>
    )
}
