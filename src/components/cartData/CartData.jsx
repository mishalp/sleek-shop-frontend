import { formatPrice } from '@/utils/utils'
import { Separator } from '@/components/ui/separator'
import { useSelector } from 'react-redux'

export function CartData() {
    const cart = useSelector(state => state.cart.cart)
    let subTotal = cart?.reduce((total, prod) => total + (prod.item.price * prod.count), 0)
    let shipping = 60
    let discount = 0
    let total = subTotal + shipping
    return (
        <div className="p-4 bg-white grid gap-8 grid-cols-1 shadow rounded xl:min-w-[20rem]">
            <div className="flex gap-4 items-center justify-between">
                <p>Subtotal:</p>
                <p className='text-lg font-medium'>{formatPrice(subTotal)}</p>
            </div>
            <div className="flex gap-4 items-center justify-between">
                <p>Shipping:</p>
                <p className='text-lg font-medium'>{formatPrice(shipping)}</p>
            </div>
            <div className="flex gap-4 items-center justify-between">
                <p>Discount:</p>
                <p className='text-lg font-medium'>-</p>
            </div>
            <Separator />
            <p className='justify-self-end text-xl font-semibold'>{formatPrice(total)}</p>

        </div>
    )
}
