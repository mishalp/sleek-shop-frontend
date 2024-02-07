import { useGetAllProductsQuery } from '@/app/services/products'
import { prodcutsFailed, setProducts } from '@/features/prodcts'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function useLoadApp() {
    const dispath = useDispatch()
    const { data, isLoading, isError } = useGetAllProductsQuery()

    useEffect(() => {
        if (!isLoading) {
            if (!isError) {
                dispath(setProducts(data))
            } else {
                dispath(prodcutsFailed())
            }
        }
    }, [isLoading])

    return isLoading
}
export default useLoadApp