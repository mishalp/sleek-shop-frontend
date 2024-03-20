import { useGetCartQuery } from '@/app/services/cart'
import { setCart } from '@/app/features/cart'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function useLoadApp() {
    const dispath = useDispatch()
    const { data: cart, isLoading: cartLoading, isError: cartError } = useGetCartQuery()


    useEffect(() => {
        if (!cartLoading) {
            if (!cartError) {
                console.log(cart.cart.items);
                dispath(setCart({ cart: cart.cart.items || [], user: true }))
            } else {
                let cart = JSON.parse(localStorage.getItem('cart')) || []
                console.log(cart);
                dispath(setCart({ cart: cart || [], user: false }))
            }
        }
    }, [cartLoading])

    return cartLoading
}
export default useLoadApp