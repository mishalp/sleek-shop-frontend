import { formatPrice } from "@/utils/utils"
import { Star } from "lucide-react"
import { Link } from "react-router-dom"

function Details({ canvas, product, zoomImg, current }) {

    if (!product) return <p>Loading</p>

    return (
        <>
            <h3 className="text-lg pb-2 lg:hidden row-[1/2] font-medium uppercase">{product.name}</h3>
            <div className="lg:col-[2/3] py-3  relative">
                <div ref={canvas} className="overflow-hidden rounded h-[calc(100vh-7rem)] shadow mt-24 mb-4 fixed h- top-0 right-5 w-1/2 bg-white hidden aspect-square" >
                    <img src={product?.images?.[current].url} ref={zoomImg} className="origin-top-left object-contain object-center bg-no-repeat aspect-square" alt="" />
                </div>
                <div className="grid grid-cols-1 gap-8 w-full">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg max-lg:hidden lg:text-2xl font-medium uppercase">{product.name}</h3>
                        <p className="text-md">{product.description}</p>
                    </div>
                    <h1 className="text-3xl max-lg:row-[1/2] font-semibold" >{formatPrice(product.price)} <span className="text-[rgba(0,0,0,0.50)] text-2xl line-through">{" "}{formatPrice(product.originalPrice)}</span></h1>
                    <ul className="flex flex-col gap-2 list-disc list-inside">
                        {product?.features?.map((item, key) => (
                            <li key={key}>{item}</li>
                        ))}
                    </ul>
                    <div className="flex flex-col gap-3">
                        <h4 className="text-2xl font-semibold">Seller Info</h4>
                        <div className="grid grid-cols-[auto,1fr] md:grid-cols-[auto,auto,auto] gap-2 bg-white p-3 rounded-md md:items-center justify-around">
                            <img src={product.shop.avatar.url} className="max-w-16 col-[1/2] rounded-full aspect-square object-cover" alt="" />
                            <div className="flex flex-col">
                                <h3 className="text-lg font-medium">{product.shop.name}</h3>
                                <p>{product.shop.email}</p>
                                <p>{product.shop.address}</p>
                            </div>
                            <Link to={`/shop/${product.shop._id}`} className="bg-mytertiory max-md:col-span-2 text-white rounded-lg px-8 py-4 h-fit">Visit Store</Link>
                        </div>
                    </div>
                    {product.reviews.length > 0 && <div className="flex flex-col gap-3">
                        <h4 className="text-2xl font-semibold">Reviews</h4>
                        {product.reviews.map((item, i) => (
                            <div key={i} className="flex  gap-4 p-3 rounded-md md:items-center">
                                <img src={item.user.avatar.url} className="max-w-16 col-[1/2] rounded-full aspect-square object-cover" alt="" />
                                <div className="flex flex-col">
                                    <h3 className="text-lg font-medium flex gap-2">
                                        {addFill(parseInt(item.rating)).map(item => (
                                            <Star color="#F6BB33" fill={item} />
                                        ))}
                                    </h3>
                                    <p className="font-semibold">{item.user.name}</p>
                                    <p className="opacity-70">{item.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>}
                </div>
            </div>
        </>
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

export default Details