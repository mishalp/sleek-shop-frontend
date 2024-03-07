import { useGetCartQuery } from '@/app/services/cart'
import { useGetAllProductsQuery } from '@/app/services/products'
import { setCart } from '@/app/features/cart'
import { prodcutsFailed, setProducts } from '@/app/features/prodcts'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function useLoadApp() {
    const dispath = useDispatch()
    const { data, isLoading, isError } = useGetAllProductsQuery()
    const { data: cart, isLoading: cartLoading, isError: cartError } = useGetCartQuery()

    useEffect(() => {
        if (!isLoading) {
            if (!isError) {
                dispath(setProducts(data))
            } else {
                dispath(prodcutsFailed())
            }
        }
    }, [isLoading])

    useEffect(() => {
        if (!cartLoading) {
            if (!cartError) {
                console.log(cart.cart.items);
                dispath(setCart({ cart: cart.cart.items || [], user: true }))
            } else {
                let cart = JSON.parse(localStorage.getItem('cart')) || []
                console.log(cart);
                dispath(setCart({ cart: cart.cart || [], user: false }))
            }
        }
    }, [cartLoading])

    return isLoading
}
export default useLoadApp