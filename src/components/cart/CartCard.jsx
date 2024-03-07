import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useUserVerifyQuery } from '@/app/services/user'
import { useDecrementCartMutation, useIncrementCartMutation, useRemoveCartProductMutation } from '@/app/services/cart'
import { decrementCount, incrementCount, removeFromCart } from '@/app/features/cart'
import { useToast } from '../ui/use-toast'
import { useDispatch } from "react-redux"
import { formatPrice } from "@/utils/utils"

export function CartCard({ prod }) {

    const { isError: userError } = useUserVerifyQuery()
    const [incrementProd, { isLoading: incLoading }] = useIncrementCartMutation()
    const [decrementProd, { isLoading: decLoading }] = useDecrementCartMutation()
    const [removeCartProduct, { isLoading: removeCartLoading }] = useRemoveCartProductMutation()
    const dispatch = useDispatch()
    const { toast } = useToast()

    const increment = async (item) => {
        if (item.count < item.item.stock) {
            try {
                if (!userError) {
                    await incrementProd(item.item._id)
                }
                dispatch(incrementCount({ id: item.item._id, user: userError ? false : true }))

            } catch (error) {
                console.log(error);
                toast({
                    variant: "destructive",
                    title: error.data.message,
                })
            }
        }
    }

    const decrement = async (item) => {
        if (item.count > 1) {
            try {
                if (!userError) {
                    await decrementProd(item.item._id)
                }
                dispatch(decrementCount({ id: item.item._id, user: userError ? false : true }))

            } catch (error) {
                console.log(error);
                toast({
                    variant: "destructive",
                    title: error.data.message,
                })
            }
        }
    }

    const removeCartItem = async (id) => {
        try {
            if (!userError) {
                await removeCartProduct(id)
            }
            dispatch(removeFromCart({ id, user: userError ? false : true }))
            toast({
                title: "Removed from Cart",
                variant: "success"
            })
        } catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: error.data.message,
            })
        }
    }

    return <div key={prod.item._id} className="flex gap-4 py-3">
        <div className="flex flex-col items-center justify-around gap-2">
            <button disabled={!(prod.count < prod.item.stock) || removeCartLoading || incLoading || decLoading} onClick={() => increment(prod)} className='bg-black aspect-square flex items-center justify-center w-8 object-contain disabled:opacity-50 text-white rounded-full'>+</button>
            <div className="">{prod.count}</div>
            <button disabled={!(prod.count > 1) || removeCartLoading || incLoading || decLoading} onClick={() => decrement(prod)} className='bg-black aspect-square flex items-center justify-center w-8 object-contain text-white disabled:opacity-50 rounded-full'>-</button>
        </div>
        <div className="flex flex-col w-full gap-2">
            <div className="flex gap-3 items-center">
                <img src={prod.item.images[0].url} className='w-20 aspect-square object-contain' alt="" />
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger className="flex">
                            <p className="overflow-hidden text-sm text-left">{prod.item.name.substring(0, 50)}{prod.item.name.length > 50 && "..."}</p>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-[20rem]" >
                            <p>{prod.item.name}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <div className="flex justify-between">
                <h3 className="font-semibold text-lg">{formatPrice(prod.item.price)}</h3>
                <button onClick={() => removeCartItem(prod.item._id)} disabled={removeCartLoading || incLoading || decLoading} className='text-red-500 font-semibold disabled:opacity-50'>Remove</button>
            </div>
        </div>
    </div>
}