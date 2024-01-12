import ProductCard from "../../../../components/productCard/ProductCard"
import { products } from "../../../../data"

function BestSellingSection() {
    return (
        <div className="py-6 lg:p-6 flex flex-col gap-6">
            <h2 className="text-4xl ml-6 font-semibold">Best Selling</h2>
            <div className="overflow-auto disableScrollBar">
                <div className='flex xl:grid w-fit mx-6 my-2 xl:grid-cols-5 gap-4'>
                    {products.filter((item, index) => index < 10).map((item, key) => (
                        <ProductCard item={item} id={key} key={item.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BestSellingSection