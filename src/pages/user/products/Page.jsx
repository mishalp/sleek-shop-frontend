import { useGetAllProductsQuery } from "@/app/services/products"
import ProductCard from "@/components/productCard/ProductCard"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { categories } from "@/data"
import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function Page() {
    const { cat } = useParams()
    const { data, isLoading, isError } = useGetAllProductsQuery()
    const ref = useRef()

    if (isLoading) return <p>Loading</p>
    if (isError) return <p>Something went wrong</p>


    return (
        <div className="flex flex-col min-h-[90vh] w-full mt-20 py-4">
            <div className="flex flex-col gap-2 p-6">
                <p className="font-semibold text-lg">Category</p>
                <CatSelect cat={cat} menuRef={ref} />
            </div>
            <div className="py-6 lg:p-6 flex flex-col gap-6">
                <div className="overflow-auto disableScrollBar">
                    <div ref={ref} className='items-center grid grid-cols-2 w-fit mx-6 my-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-2 sm:gap-4'>
                        {(() => {
                            const filtered = data.products.filter(item => cat !== 'all' ? cat === item.category : true);
                            if (filtered.length < 1) return <div className="col-span-5 grid place-items-center">
                                <p>No Results</p>
                            </div>
                            return filtered.map(item => (
                                <ProductCard item={item} id={item._id} key={item._id} />
                            ))
                        })()}
                    </div>
                </div>
            </div>
        </div >
    )
}

function CatSelect({ cat, menuRef }) {
    const navigate = useNavigate()

    console.log(cat);

    return <>
        <Select defaultValue={cat} onOpenChange={(val) => {
            if (val === true) {
                menuRef.current.style = "pointer-events: none;"
            } else {
                setTimeout(() => menuRef.current.style = "pointer-events: auto;", 20)

            }
        }} onValueChange={(val) => navigate(`/products/category/${val}`)}>
            <SelectTrigger className="w-fit capitalize">
                <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {['all', ...categories].map((item, i) => (
                        <SelectItem className='z-20 capitalize' key={i} value={item}>{item}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    </>
}