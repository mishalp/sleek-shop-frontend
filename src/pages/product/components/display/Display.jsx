import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Button from "../../../../components/button/MyButton"
import { useDispatch, useSelector } from "react-redux"
import { useAddCartProductMutation, useRemoveCartProductMutation } from "@/app/services/cart"
import { useToast } from "@/components/ui/use-toast"
import { useUserVerifyQuery } from "@/app/services/user"
import { addToCart, removeFromCart } from "@/features/cart"
import { ReloadIcon } from "@radix-ui/react-icons"

function Display({ images, prodId, canvas, zoomImg, current, setCurrent }) {
    const lens = useRef()
    const image = useRef()
    const display = useRef()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    let isInCart = cart.cart.findIndex(item => item.id === prodId)
    const { toast } = useToast()

    const [addCartProduct, { isLoading: addCartLoading }] = useAddCartProductMutation()
    const [removeCartProduct, { isLoading: removeCartLoading }] = useRemoveCartProductMutation()
    const { isError: userError, isLoading } = useUserVerifyQuery()

    useEffect(() => {
        const trackLense = (e) => {
            lens.current.style.display = "flex";
            canvas.current.style.display = "flex";
            let width = image.current.offsetWidth
            let height = image.current.offsetHeight
            let offset = image.current.getBoundingClientRect()

            lens.current.style.transform = `translate(${e.clientX - offset.left - (lens.current.offsetWidth / 2)}px, ${e.clientY - offset.top - (lens.current.offsetHeight / 2)}px)`

            let posX = (e.clientX - offset.left) / width * 100
            let posY = (e.clientY - offset.top) / height * 100
            zoomImg.current.style.transform = `translate(-${posX * 2.2 - 17}%, -${posY * 2.2 - 17}%) scale(3)`

        }
        if (image && image.current && lens && lens.current) {

            lens.current.style.width = '35%'
            image.current.addEventListener("mousemove", trackLense)

            image.current.addEventListener("mouseleave", () => { lens.current.style.display = "none"; canvas.current.style.display = "none" })
        }
        return () => {
            if (image.current) image.current.removeEventListener("mousemove", trackLense)
        }
    }, [image, lens])

    const addCartItem = async () => {
        try {
            if (!userError) {
                await addCartProduct(prodId)
            }
            dispatch(addToCart({ id: prodId, user: userError ? false : true }))
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
                await removeCartProduct(prodId)
            }
            dispatch(removeFromCart({ id: prodId, user: userError ? false : true }))
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

    if (isLoading) return <p>loading</p>

    return (
        <div ref={display} className="p-3 flex gap-3 w-full sticky top-[100px] h-fit">
            <div className="flex flex-col gap-4 bg-myprimary">
                {images?.map((img, key) => (
                    <img src={img.url} onClick={() => setCurrent(key)} key={key} className={`max-w-14 cursor-pointer border-2 ${current === key ? 'border-mytertiory' : 'border-slate-300'} aspect-square object-contain rounded p-2 h-auto mix-blend-multiply`} alt="" />
                ))}
            </div>
            <div className="flex flex-col gap-3 items-center w-full">
                <div className="p-3 pt-0 flex w-full justify-center items-center">
                    <div ref={image} className="relative overflow-hidden cursor-crosshair flex w-full justify-center bg-myprimary">
                        <img src={images?.[current].url} className="aspect-square object-contain w-full max-h-[60vh] mix-blend-multiply" alt="" />
                        <div ref={lens} className="bg-[hsla(0,0%,100%,.3)] border-[#ccc] hidden absolute top-0 left-0 aspect-square max-w-[30%]"></div>
                    </div>
                </div>
                <div className="flex gap-4 justify-center">
                    <Button disabled={addCartLoading || removeCartLoading} onClick={isInCart != -1 ? removeCartItem : addCartItem} className='min-w-12 !rounded flex items-center' >
                        {(addCartLoading || removeCartLoading) && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                        {isInCart != -1 ? "Remove from cart" : "Add to Cart"}
                    </Button>
                    <Button title="Buy Now" primary className='min-w-44 !rounded' />
                </div>
            </div>
        </div>
    )
}

export default Display