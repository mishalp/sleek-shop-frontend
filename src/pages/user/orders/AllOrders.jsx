import { useGetAllUserOrderQuery } from '@/app/services/order'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { formatPrice } from '@/utils/utils'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'

export default function AllOrders() {
    const { data, isLoading, isError } = useGetAllUserOrderQuery()
    const navigate = useNavigate()

    if (isError) return null

    return (
        <div className="md:container mx-auto py-10 flex gap-4 flex-col">
            {!isLoading ?
                data.orders.length < 1 ?
                    <div className="w-full min-h-[20rem] text-2xl text-gray-500 flex gap-2 items-center justify-center font-popins">
                        <AlertCircle size={32} />
                        No Orders
                    </div>
                    :
                    <>
                        {data.orders.map(item => (
                            <div key={item._id} className="flex flex-col max-md:text-sm lg:grid gap-4 grid-cols-3 grid-rows-[auto,auto,1fr] p-4 justify-between bg-white">
                                <div className="flex gap-2 col-span-3">
                                    <p className='font-semibold'>Order Id:</p>
                                    <p className='opacity-50'>#{item._id}</p>
                                </div>
                                <div className="flex gap-2 col-span-3">
                                    <p className='font-semibold '>Items:</p>
                                    <p>{item.cart.length}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className='font-semibold'>Status:</p>
                                    <p>{item.status}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className='font-semibold'>Total Price:</p>
                                    <p>{formatPrice(item.totalPrice)}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className='font-semibold'>Payment:</p>
                                    <p>{item.paymentInfo.type}</p>
                                </div>
                                <div className="flex col-span-3 justify-self-end">
                                    <Button onClick={() => navigate(`/user/orders/${item._id}`)} >View details</Button>
                                </div>
                            </div>
                        ))}
                    </>
                :
                <>
                    {["", "", "", "",].map((item, i) => (
                        <OrderSkelton key={i} />
                    ))}
                </>

            }
        </div>
    )
}

function OrderSkelton() {
    return (
        <Skeleton className="flex flex-col lg:grid gap-4 grid-cols-3 grid-rows-[auto,auto,1fr] p-4 justify-between bg-gray-200">
            <div className="flex gap-2 col-span-3">
                <Skeleton className='w-28 h-5 bg-gray-300'></Skeleton>
                <Skeleton className='w-28 h-5 bg-gray-300'></Skeleton>
            </div>
            <div className="flex gap-2 col-span-3">
                <Skeleton className='w-28 h-5 bg-gray-300'></Skeleton>
                <Skeleton className='w-28 h-5 bg-gray-300'></Skeleton>

            </div>
            <div className="flex gap-2">
                <Skeleton className='w-full h-5 bg-gray-300'></Skeleton>
            </div>
            <div className="flex gap-2">
                <Skeleton className='w-full h-5 bg-gray-300'></Skeleton>
            </div>
            <div className="flex gap-2">
                <Skeleton className='w-full h-5 bg-gray-300'></Skeleton>
            </div>
            <div className="flex col-span-3 justify-self-end">
                <Skeleton className='w-24 h-10 bg-gray-300'></Skeleton>
            </div>
        </Skeleton>
    )
}
