import { useUpdateOrderStatusMutation } from "@/app/services/order";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { formatPrice } from "@/utils/utils";
import { Country, State } from "country-state-city";
import { ReloadIcon } from "@radix-ui/react-icons"
import { useEffect, useRef, useState } from "react";
import { BaggageClaim, Bike, ClipboardCheck, PackageCheck, PackageSearch, Star, Truck } from "lucide-react";
import { ReviewDialog } from "./ReviewDialog";

let status = [
    {
        title: "Processing",
        icon: <PackageSearch color="white" />
    },
    {
        title: "Transferred to delivery partner",
        icon: <BaggageClaim color="white" />
    },
    {
        title: "Shipping",
        icon: <Truck color="white" />
    },
    {
        title: "Recieved",
        icon: <ClipboardCheck color="white" />
    },
    {
        title: "On the way",
        icon: <Bike color="white" />
    },
    {
        title: "Delivered",
        icon: <PackageCheck color="white" />
    },
]

export default function OrderDetails({ isLoading, isFetching, order, user, seller }) {

    if (!order) return <p>loading</p>
    let flag = false

    return (
        <div className="flex flex-col gap-8">
            <p className="opacity-60">Order Id: #{order._id}</p>
            {seller && <OrderUpdater loading={isLoading} fetching={isFetching} order={order} />}
            <div className="flex flex-col gap-8">
                {order.cart.map((item, index) => (
                    <>
                        <div key={index} className="grid grid-cols-1 md:grid-cols-[5rem,1fr,auto] items-center gap-4">
                            <img src={item.images[0].url} className='w-20 aspect-square object-contain mix-blend-multiply' alt="" />
                            <div className="flex flex-col gap-2">
                                <p className="md:text-lg font-medium">{item.name}</p>
                                <p className="text-sm">{item.category}</p>
                            </div>
                            <div className="flex">
                                <p>{item.qty} x {formatPrice(item.price)} = {formatPrice(item.price * item.qty)}</p>
                            </div>
                            {!seller && order.status === "Delivered" &&
                                <div>
                                    {item.isReviewed ? <h4 className="italic">Reviewed</h4> : <ReviewDialog product={item} orderId={order._id} />}
                                </div>
                            }
                        </div>
                        <Separator />
                    </>
                ))}
            </div>
            {!seller && <><OrdrerStatusBar limit={status.filter((i, k) => k <= status.findIndex((v) => order.status === v.title))} />
                <Separator />
            </>}
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

function OrderUpdater({ order, loading, fetching }) {
    const [value, setValue] = useState(order.status)
    const [updateStatus, { isLoading }] = useUpdateOrderStatusMutation()
    const { toast } = useToast()
    let flag = false

    const handleUpdate = async () => {
        if (order.status === value) return
        try {
            await updateStatus({ id: order._id, value }).unwrap()
            toast({
                title: "Success",
                description: "Order status updated",
                variant: "success",
            })
        } catch (error) {
            toast({
                title: "Failed",
                description: error.message ? error.message : "Order update failed",
                variant: "destructive",
            })
        }
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
                        {status.filter(item => { if (item.title === order.status) flag = true; return flag }).map((item, i) => (
                            <SelectItem key={i} value={item.title}>{item.title}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button disabled={order.status === value || isLoading || loading || fetching} onClick={handleUpdate}>
                    {isLoading || fetching || loading ? <><ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please wait</> : "Update"}
                </Button>
            </div>
        </div>
    )
}

function OrdrerStatusBar({ limit }) {

    return (
        <div className="flex flex-col gap-2">
            <h2>Your Order:</h2>
            <div className=" grid grid-rows-[repeat(auto-fit,minmax(80px,1fr))] lg:grid-rows-1 lg:grid-cols-6 ">
                {limit.map((item, i) => (
                    <div key={i} className="flex max-lg:min-h-[80px] lg:flex-col gap-2 w-full text-center">
                        <div className="flex items-center justify-center relative">
                            <div className="flex p-2 z-[2] rounded-full bg-mysecondary relative">
                                {item.icon}
                                {limit.length - 1 === i && <span className="absolute rounded-full inset-0 w-full bg-mysecondary animate-ping"></span>}
                            </div>
                            <div className="absolute max-lg:top-0 h-1/2 w-2 lg:left-0  lg:w-1/2 bg-mysecondary lg:h-2"></div>
                            {limit.length - 1 !== i && <div className="absolute max-lg:bottom-0 h-1/2 w-2 lg:right-0 lg:w-1/2 bg-mysecondary lg:h-2"></div>}
                        </div>
                        <p className="max-lg:my-auto lg:text-center">{item.title}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
