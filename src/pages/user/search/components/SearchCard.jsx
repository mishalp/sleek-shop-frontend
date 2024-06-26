import { formatPrice } from "@/utils/utils";
import { Link } from "react-router-dom"

function SearchCard({ product }) {
    return (
        <Link
            to={`/products/${product._id}`}
            className="grid grid-cols-2 md:grid-cols-[1fr,2.5fr,1fr] group gap-2 md:gap-6 w-full py-2"
        >
            <img src={product.images[0].url} className="max-md:col-[1/2] max-md:max-h-32 aspect-square object-contain self-center justify-self-center max-h-56" alt="" />
            <div className="flex flex-col gap-4 max-md:col-span-2">
                <div className="flex flex-col gap-1">
                    <p className="font-medium line-clamp-2 sm:line-clamp-3 md:line-clamp-none group-hover:text-blue-500">{product.name}</p>
                    <div className="px-2 py-1 text-sm rounded-lg h-fit w-fit justify-self-start bg-mytertiory text-white">
                        {product?.rating?.rate || "No Rating"}★
                    </div>
                </div>
                <ul className="flex flex-col max-md:hidden list-disc list-inside">
                    {product?.features?.map((item, key) => (
                        <li key={key}>{item}</li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col max-md:justify-center max-md:col-[2/3] max-md:row-[1/2]">
                <h1 className="text-2xl font-semibold" >{formatPrice(product.price)}</h1>
                <p className="text-[rgba(0,0,0,0.50)] text-lg line-through">{formatPrice(product.originalPrice)}</p>
            </div>
        </Link>
    )
}

export default SearchCard