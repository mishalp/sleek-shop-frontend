import { useGetAllProductsQuery } from "@/app/services/products"
import { useEffect, useState } from "react"

function useGetProduct(id) {
    const [product, setProduct] = useState(null)
    const { data, isLoading } = useGetAllProductsQuery()

    useEffect(() => {
        if (!isLoading) {
            setProduct(data.products.find((item, i) => item._id === id))
        }
    }, [isLoading])

    return product
}
export default useGetProduct