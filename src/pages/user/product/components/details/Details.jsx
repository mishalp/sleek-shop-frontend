import { formatPrice } from "@/utils/utils"

function Details({ canvas, product, zoomImg, current }) {

    if (!product) return <p>Loading</p>

    return (
        <div className="col-[2/3] py-3  relative">
            <div ref={canvas} className="overflow-hidden rounded h-[calc(100vh-7rem)] shadow mt-24 mb-4 fixed h- top-0 right-5 w-1/2 bg-white hidden aspect-square" >
                <img src={product?.images?.[current].url} ref={zoomImg} className="origin-top-left object-contain object-center bg-no-repeat aspect-square" alt="" />
            </div>
            <div className="flex flex-col gap-8 w-full">
                <div className="flex flex-col gap-2">
                    <h3 className="text-2xl font-medium uppercase">{product.name}</h3>
                    <p className="text-md">{product.description}</p>
                </div>
                <h1 className="text-3xl font-semibold" >{formatPrice(product.price)} <span className="text-[rgba(0,0,0,0.50)] text-2xl line-through">{" "}{formatPrice(product.originalPrice)}</span></h1>
                <ul className="flex flex-col gap-2 list-disc list-inside">
                    {product?.features?.map((item, key) => (
                        <li key={key}>{item}</li>
                    ))}
                </ul>
                <div className="flex flex-col gap-3">
                    <h4 className="text-2xl">Seller Info</h4>
                    <div className="flex gap-2 bg-white p-3 rounded-md items-center justify-around">
                        <img src={product.shop.avatar.url} className="max-w-16 rounded-full aspect-square object-cover" alt="" />
                        <div className="flex flex-col">
                            <h3 className="text-lg font-medium">{product.shop.name}</h3>
                            <p>{product.shop.email}</p>
                            <p>{product.shop.address}</p>
                        </div>
                        <button className="bg-mytertiory text-white rounded-lg px-8 py-4 h-fit">Visit Store</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details