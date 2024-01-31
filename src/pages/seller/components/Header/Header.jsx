import logo from '@/assets/icons/newLogo.svg'
import { Gift, MessageSquareMore, Package, ShoppingBag, Tag } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Header() {
    const { avatar } = useSelector(store => store.seller.info)
    return (
        <div className="fixed top-0 z-10 p-4 flex justify-between w-full items-center bg-mysecondary" >
            <Link to={'/'} >
                <img src={logo} alt="" className='w-28' />
            </Link>
            <div className="flex items-center gap-8">
                <Link to="">
                    <Gift color='white' size={32} strokeWidth={1.5} />
                </Link>
                <Link to="">
                    <Tag color='white' size={32} strokeWidth={1.5} />
                </Link>
                <Link to="">
                    <ShoppingBag color='white' size={32} strokeWidth={1.5} />
                </Link>
                <Link to="">
                    <Package color='white' size={32} strokeWidth={1.5} />
                </Link>
                <Link to="">
                    <MessageSquareMore color='white' size={32} strokeWidth={1.5} />
                </Link>
                <img src={avatar.url} className='w-11 rounded-full aspect-square object-cover' alt="" />
            </div>
        </div>
    )
}

export default Header