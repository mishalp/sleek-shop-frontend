import ProductCard from '@/components/productCard/ProductCard'


export default function ShopProducts({ products, isLoading, isError }) {

    return (
        <div className="py-6 lg:p-6 flex flex-col gap-6">
            <h2 className="text-3xl ml-6 font-semibold">Shop Products</h2>
            <div className='grid w-fit grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                {products.map(item => (
                    <ProductCard item={item} id={item._id} key={item._id} />
                ))}
            </div>
        </div>
    )
}
