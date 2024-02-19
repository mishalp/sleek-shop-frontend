import { useGetShopProdcutsQuery } from "@/app/services/products"
import { useSellerVerifyQuery } from "@/app/services/seller"
import { useEffect, useState } from "react"

function useGetShopProduct(id) {
    const [product, setProduct] = useState(null)
    const { data: { user } } = useSellerVerifyQuery()
    const { data, isLoading } = useGetShopProdcutsQuery(user._id)

    useEffect(() => {
        if (!isLoading) {
            setProduct(data.products.find((item, i) => item._id === id))
        }
    }, [isLoading])

    return product
}

export default useGetShopProduct