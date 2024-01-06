import heart from '../../assets/icons/heart_black.svg'
import cart from '../../assets/icons/cart_black.svg'

function ProductCard({ item }) {
    return (
        <div className="min-w-64 xl:min-w-fit bg-white p-3 grid group grid-cols-1 shadow gap-2 rounded-md overflow-hidden">
            <div className="p-3 overflow-hidden flex justify-center items-center relative">
                <img src={item.image} className="aspect-square object-contain group-hover:scale-[1.1] duration-200" alt="" />
                <div className="bg-[rgba(255,255,255,.8)] gap-4 z-[1] absolute inset-0 hidden group-hover:flex items-center justify-center">
                    <div className="p-2 bg-white active:scale-75 duration-200 cursor-pointer flex items-center justify-center rounded-full shadow-md">
                        <img src={heart} alt="" />
                    </div>
                    <div className="p-2 bg-white active:scale-75 duration-200 flex items-center cursor-pointer justify-center rounded-full shadow-md">
                        <img src={cart} alt="" />
                    </div>
                </div>
            </div>
            <div className="z-[1] bg-white flex flex-col items-start gap-2 justify-between">
                <p className="text-md w-full overflow-hidden whitespace-nowrap text-ellipsis md:text-xl">{item.title.substring(0, 30)}{item.title.length > 30 && "..."}</p>
                <div className="px-2 py-1 text-sm rounded-lg h-fit justify-self-start bg-tertiory text-white">
                    {item.rating.rate}★
                </div>
                <h3 className="font-semibold text-lg">₹{item.price * 5}</h3>
            </div>
        </div>
    )
}

export default ProductCard