import heart from '../../assets/icons/heart_black.svg'
import cart from '../../assets/icons/cart_black.svg'
import { useRef } from 'react'
import { formatPrice } from '../../utils/utils'
import { Link } from 'react-router-dom'

function ProductCard({ item, id }) {

    const ref = useRef()

    const handleClick = (e) => {
        if (ref.current.contains(e.target))
            e.preventDefault()
    }

    return (
        <Link to={`/products/${id}`} onClick={handleClick} className="min-w-64 xl:min-w-fit bg-white p-3 grid grid-cols-1 hover:shadow-md gap-2 rounded-sm overflow-hidden">
            <div ref={ref} className="p-3 group cursor-default overflow-hidden flex justify-center items-center relative">
                <img src={item.images[0].url} className="aspect-square object-contain group-hover:scale-[1.1] duration-200" alt="" />
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
                <p className="text-md w-full overflow-hidden whitespace-nowrap text-ellipsis md:text-xl">{item.name.substring(0, 30)}{item.name.length > 30 && "..."}</p>
                <div className="px-2 py-1 text-sm rounded-lg h-fit justify-self-start bg-mytertiory text-white">
                    {item?.rating?.rate || "No Rating"}★
                </div>
                <h3 className="font-semibold text-xl">{formatPrice(item.price)}</h3>
            </div>
        </Link>
    )
}

export default ProductCard