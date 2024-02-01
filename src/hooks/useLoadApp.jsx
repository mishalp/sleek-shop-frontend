import { useGetAllProductsQuery } from '@/app/services/products'
import { useSellerVerifyQuery } from '@/app/services/seller'
import { prodcutsFailed, setProducts } from '@/features/prodcts'
import { sellerFailed, setSeller } from '@/features/seller'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function useLoadApp() {
    const dispath = useDispatch()
    const { data, isLoading, isError } = useSellerVerifyQuery()
    const { data: products, isLoading: prodctsLoading, isError: productsError } = useGetAllProductsQuery()

    useEffect(() => {
        if (!isLoading) {
            if (!isError) {
                dispath(setSeller(data))
            } else {
                dispath(sellerFailed())
            }
        }
    }, [isLoading])

    useEffect(() => {
        if (!prodctsLoading) {
            if (!productsError) {
                dispath(setProducts(products))
            } else {
                dispath(prodcutsFailed())
            }
        }
    }, [prodctsLoading])

    return isLoading && prodctsLoading
}

export default useLoadApp