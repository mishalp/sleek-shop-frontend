import { useEffect, useRef } from 'react'
import { formatPrice } from '../../utils/utils'
import { Link } from 'react-router-dom'
import { Heart, ShoppingCart } from 'lucide-react'
import { addToCart, removeFromCart } from '@/app/features/cart'
import { useDispatch, useSelector } from 'react-redux'
import { useUserVerifyQuery } from '@/app/services/user'
import { useAddCartProductMutation, useRemoveCartProductMutation } from '@/app/services/cart'
import { useToast } from '../ui/use-toast'
import { Button } from '../ui/button'
import ImageLoader from '../imageLoader/ImageLoader'

function ProductCard({ item, id }) {

    const ref = useRef()
    const { toast } = useToast()
    const { isError: userError } = useUserVerifyQuery()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart.cart)
    const [addCartProduct, { isLoading: addCartLoading }] = useAddCartProductMutation()
    const [removeCartProduct, { isLoading: removeCartLoading }] = useRemoveCartProductMutation()

    let isInCart = cart?.findIndex(item => item.item._id === id)

    const handleClick = (e) => {
        if (window.innerWidth >= 1280 && ref.current.contains(e.target)) e.preventDefault()
    }

    const addCartItem = async () => {
        try {
            if (!userError) {
                await addCartProduct(id)
            }
            dispatch(addToCart({ item, user: userError ? false : true }))
            toast({
                title: "Added To Cart",
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

    const removeCartItem = async () => {
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

    return (
        <Link to={`/products/${id}`} onClick={handleClick} className="relative min-w-64 xl:min-w-fit bg-white p-3 grid grid-cols-1 hover:shadow-md gap-2 rounded-sm overflow-hidden">
            <div ref={ref} className="p-3 group cursor-default overflow-hidden flex justify-center items-center relative">
                {/* <img src={item.images[0].url} className="aspect-square object-contain group-hover:scale-[1.1] duration-200" alt="" /> */}
                <ImageLoader className="aspect-square object-contain group-hover:scale-[1.1] duration-200" src={item.images[0].url} />
                <div className="bg-[rgba(255,255,255,.8)] gap-4 z-[1] absolute inset-0 hidden xl:group-hover:flex items-center justify-center">
                    {/* <button className="p-2 bg-white cursor-pointer flex items-center justify-center rounded-full shadow-md" >
                        <Heart />
                    </button> */}
                    <Button className="p-2 group/cart bg-white hover:bg-white duration-200 flex items-center cursor-pointer justify-center rounded-full shadow-md" disabled={addCartLoading || removeCartLoading} onClick={!addCartLoading && !removeCartLoading ? isInCart != -1 ? removeCartItem : addCartItem : null}>
                        <ShoppingCart color={isInCart != -1 ? '#00f' : '#000'} className='group-active/cart:scale-75 duration-100' fill={isInCart != -1 ? '#00f' : '#fff'} />
                    </Button>
                </div>
            </div>
            <div className="z-[1] bg-white flex flex-col items-start gap-2 justify-between">
                <p className="text-md w-full overflow-hidden whitespace-nowrap text-ellipsis md:text-lg">{item.name.substring(0, 30)}{item.name.length > 30 && "..."}</p>
                <div className="px-2 py-1 text-sm rounded-lg h-fit justify-self-start bg-mytertiory text-white">
                    {item?.rating?.rate || "No Rating"}★
                </div>
                <h3 className="font-semibold text-xl">{formatPrice(item.price)}</h3>
            </div>
            {isInCart != -1 &&
                <div className="absolute top-0 left-4 z-[2] flex flex-col w-[36px]">
                    <div className="bg-blue-500 px-2 py-3 grid place-items-center">
                        <ShoppingCart size={18} color='white' />
                    </div>
                    <div className="grid grid-cols-2 w-full">
                        <div className="overflow-hidden w-[18px] h-[18px] after:absolute after:top-[-12px] after:left-[-13px] relative after:w-[25px] after:h-[25px] after:rotate-45 after:bg-blue-500 after:content-['']"></div>
                        <div className="overflow-hidden w-[18px] h-[18px] after:absolute after:top-[-12px] after:right-[-13px] relative after:w-[25px] after:h-[25px] after:rotate-45 after:bg-blue-500 after:content-['']"></div>
                    </div>
                </div>
            }
        </Link>
    )
}

export default ProductCard