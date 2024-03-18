import ProductCard from "@/components/productCard/ProductCard"
import { useGetAllProductsQuery } from "@/app/services/products"

function BestSellingSection() {
    const { data, isLoading, isError } = useGetAllProductsQuery()

    if (isLoading) return <p>Loading</p>
    if (isError) return <p>Something went wrong</p>

    return (
        <div className="py-6 lg:p-6 flex flex-col gap-6">
            <h2 className="text-3xl md:text-4xl ml-6 font-semibold">Best Selling</h2>
            <div className="overflow-auto disableScrollBar">
                <div className='flex xl:grid w-fit mx-6 my-2 xl:grid-cols-5 gap-4'>
                    {data.products.map(item => (
                        <ProductCard item={item} id={item._id} key={item._id} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BestSellingSection