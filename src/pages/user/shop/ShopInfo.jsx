import { useGetShopQuery } from "@/app/services/seller"
import { Separator } from "@/components/ui/separator"
import { BookUser, Mail, MapPin, Phone, Star } from "lucide-react"
import { useEffect, useState } from "react"

export default function ShopInfo({ shopId, products }) {

    const { data, isLoading, isError } = useGetShopQuery(shopId)

    const [prodData, setProdData] = useState({
        totalProducts: "",
        totalSales: "",
        avgRating: ""
    })

    useEffect(() => {
        setProdData({
            totalProducts: products.length,
            totalSales: products.reduce((total, item) => item.sold_out + total, 0),
            avgRating: (products.reduce((total, item) => isNaN(item.ratings) ? 0 + total : item.ratings + total, 0) / products.length)
        })
    }, [products])

    if (isLoading || isError) return null

    return (
        <div className="px-4 md:px-8 py-8 items-center bg-white shadow-md rounded-md flex flex-col gap-8 max-h-[80vh] md:sticky md:top-24">
            <img src={data.shop.avatar.url} className="aspect-square rounded-full object-cover w-20 mx-auto" alt="" />
            <div className="flex flex-col gap-8 sm:max-md:flex-row">
                <div className="flex flex-col gap-2">
                    <p className="text-xl font-semibold">{data.shop.name}</p>
                    <p className="flex items-center gap-2 font-medium"><Mail size={16} /> {data.shop.email}</p>
                    <p className="flex items-center gap-2 font-medium"><Phone size={16} /> {data.shop.phone}</p>
                    <p className="flex items-center gap-2 "><MapPin size={16} /> {data.shop.address}</p>
                    <p className=" flex items-center gap-2"> <BookUser size={16} />{data.shop.zip}</p>
                </div>
                <Separator className="sm:max-md:hidden" />
                <div className="flex flex-col font-popins gap-2">
                    <p>Total products: {prodData.totalProducts}</p>
                    <p>Total sales: {prodData.totalSales}</p>
                    <p className="">Average rating:</p>
                    <p className="flex gap-1">{addFill(parseInt(prodData.avgRating)).map(item => (
                        <Star color="#F6BB33" fill={item} />
                    ))}</p>
                </div>
            </div>
        </div>
    )
}

const addFill = (rating) => {
    let fill = ["#F6BB33", "#F6BB33", "#F6BB33", "#F6BB33", "#F6BB33"]
    fill = fill.map((item, i) => {
        if (i + 1 <= rating) return item
        return '#fff'
    })
    return fill
}

