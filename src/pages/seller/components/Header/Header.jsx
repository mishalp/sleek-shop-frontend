import logo from '@/assets/icons/newLogo.svg'
import { Gift, MessageSquareMore, Package, ShoppingBag, Tag } from 'lucide-react'
import { useSelector } from 'react-redux'

function Header() {
    const { avatar } = useSelector(store => store.seller.info)
    return (
        <div className="fixed top-0 z-10 p-4 flex justify-between w-full items-center bg-mysecondary" >
            <img src={logo} alt="" className='w-28' />
            <div className="flex items-center gap-8">
                <a href="">
                    <Gift color='white' size={32} strokeWidth={1.5} />
                </a>
                <a href="">
                    <Tag color='white' size={32} strokeWidth={1.5} />
                </a>
                <a href="">
                    <ShoppingBag color='white' size={32} strokeWidth={1.5} />
                </a>
                <a href="">
                    <Package color='white' size={32} strokeWidth={1.5} />
                </a>
                <a href="">
                    <MessageSquareMore color='white' size={32} strokeWidth={1.5} />
                </a>
                <img src={avatar.url} className='w-11 rounded-full aspect-square object-cover' alt="" />
            </div>
        </div>
    )
}

export default Header