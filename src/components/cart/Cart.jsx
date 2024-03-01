import React from 'react'
import { useSelector } from 'react-redux'
import { formatPrice } from '@/utils/utils'
import { CartCard } from './CartCard'


export default function Cart() {

    const cart = useSelector(state => state.cart.cart)

    return (
        <div>
            <div className="flex pb-48 flex-col divide-y-[.5px] p-4 divide-gray-200 overflow-auto h-screen">
                {cart.map((prod) => (
                    <CartCard prod={prod} key={prod.item._id} />
                ))}
            </div>
            <button className="absolute h-16 shadow-md hover:shadow-xl rounded-md bottom-4 right-4 left-4 bg-mysecondary">
                <p className='text-xl text-white font-semibold'>Checkout Now ({formatPrice(cart.reduce((total, prod) => total + (prod.item.price * prod.count), 0))})</p>
            </button>
        </div>
    )
}
