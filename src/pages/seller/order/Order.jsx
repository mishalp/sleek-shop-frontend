import Header from "../components/Header/Header"
import SideBar from "../components/sideBar/SideBar"
import { ArrowLeft, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate, useParams } from "react-router-dom"
import OrderDetails from "./OrderDetails"
import { useEffect, useState } from "react"
import { useGetAllSellerOrderQuery } from "@/app/services/order"

function Order() {
    const navigate = useNavigate()

    const { data, isLoading, isError } = useGetAllSellerOrderQuery()
    const [order, setOrder] = useState(null)
    const { orderId } = useParams()

    useEffect(() => {
        if (!isLoading && !isError) {
            setOrder(data.orders.find((item) => item._id === orderId))
        }
    }, [isLoading])

    return (
        <div className='w-screen max-w-full bg-myprimary'>
            <Header />
            <div className="grid grid-cols-[auto,1fr] w-full mt-20">
                <SideBar active={1} />
                <div className="p-4 flex flex-col">
                    <div className="flex gap-2 mr-auto items-center">
                        <Button onClick={() => navigate('/seller/all-orders')} className="rounded-full ml-8 p-2 h-auto w-auto">
                            <ArrowLeft />
                        </Button>
                        <h2 className="text-2xl font-bold font-popins text-center  inline-flex gap-2">Order Details</h2>
                    </div>
                    <div className="container mx-auto py-10">
                        <OrderDetails order={order} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order