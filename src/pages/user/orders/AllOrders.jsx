import { useGetAllUserOrderQuery } from '@/app/services/order'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/utils/utils'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function AllOrders() {
    const { data, isLoading, isError } = useGetAllUserOrderQuery()
    const navigate = useNavigate()

    if (isLoading || isError) return null

    return (
        <div className="container mx-auto py-10 flex gap-4 flex-col">
            {data.orders.map(item => (
                <div key={item._id} className="flex flex-col lg:grid gap-4 grid-cols-3 grid-rows-[auto,auto,1fr] p-4 justify-between bg-white">
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
        </div>
    )
}
