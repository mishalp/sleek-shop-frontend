import React from 'react'
import { useSelector } from 'react-redux'
import { formatPrice } from '@/utils/utils'
import { CartCard } from './CartCard'
import { useNavigate } from 'react-router-dom'


export default function Cart() {

    const cart = useSelector(state => state.cart.cart)
    const navigate = useNavigate()

    return (
        <div>
            <div className="flex pb-48 flex-col divide-y-[.5px] p-4 divide-gray-200 overflow-auto h-screen">
                {cart.length !== 0 ?
                    <>
                        {
                            cart.map((prod) => (
                                <CartCard prod={prod} key={prod.item._id} />
                            ))
                        }
                    </>
                    :
                    <div className="flex h-full items-center justify-center">
                        <p>Cart is empty</p>
                    </div>
                }
            </div>
            <button disabled={cart.length === 0} onClick={() => navigate('/user/checkout')} className="absolute disabled:opacity-50 h-16 shadow-md hover:shadow-xl rounded-md bottom-4 right-4 left-4 bg-mysecondary">
                <p className='text-xl text-white font-semibold'>Checkout Now ({formatPrice(cart.reduce((total, prod) => total + (prod.item.price * prod.count), 0))})</p>
            </button>
        </div>
    )
}
