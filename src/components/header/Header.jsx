import logo from '../../assets/icons/newLogo.svg'
import shope from '../../assets/icons/shope.svg'
import SearchInput from '../searchInput/SearchInput'
import heart from '../../assets/icons/heart.svg'
import cartImg from '../../assets/icons/cart.svg'
import profile from '../../assets/icons/profile.svg'
import menu from '../../assets/icons/menu.svg'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSellerVerifyQuery } from '@/app/services/seller'
import { useUserVerifyQuery } from '@/app/services/user'
import { ShoppingCart } from 'lucide-react'
import { useSelector } from 'react-redux'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from '../ui/separator'
import Cart from '../cart/Cart'


const links = [
    {
        text: "Home",
        link: "/"
    },
    {
        text: "Products",
        link: "#"
    },
    {
        text: "Best Selling",
        link: "#"
    },
    {
        text: "FAQ",
        link: "#"
    },
]

const iconLinks = [
    {
        name: "Become a Seller",
        icon: shope,
        styles: 'sm:hidden',
        link: '/seller/login'
    },
    // {
    //     name: "Whishlist",
    //     icon: heart,
    // },
    {
        name: "Cart",
        icon: cartImg
    },
    {
        name: "Profile",
        icon: profile
    }
]

function Header() {

    const [show, setShow] = useState(false)
    const { isLoading, isError } = useSellerVerifyQuery()
    const { data, isLoading: userLoading, isError: userError } = useUserVerifyQuery()
    const cart = useSelector(state => state.cart.cart)
    const navigate = useNavigate()

    function getResult(value) {
        navigate(`/search/${value}`)
    }

    return (
        <div className={`w-full z-10 text-white overflow-hidden text-lg justify-between items-center bg-mysecondary p-4 lg:px-8 fixed sm:grid-cols-[auto,1fr,auto] lg:grid-cols-[auto,1fr,auto,auto] xl:grid-cols-3 gap-x-8 grid grid-cols-3`}>
            <img src={menu} alt="" className='xl:hidden w-7' onClick={() => setShow(!show)} />
            <div className="flex gap-6 justify-center items-center sm:justify-self-start">
                <Link to='/'>
                    <img src={logo} className='w-28' alt="" />
                </Link>
                <SearchInput getResult={getResult} className='hidden xl:flex' />
            </div>

            <div className="gap-6 items-center justify-self-center hidden lg:flex">
                {links.map((item, key) => (
                    <a key={key} href={item.link} className='font-popins font-medium' >{item.text}</a>
                ))}
            </div>
            <Sheet >
                <div className="flex gap-6 justify-end">
                    <Link to={!isError && !isLoading ? "/seller/dashboard" : "/auth/seller/login"} className='gap-2 items-center hidden sm:flex'>
                        <img src={shope} className='w-[1.5rem]' alt="" />
                        <p className='font-popins font-medium' >{!isError && !isLoading ? "Seller Dashboard" : "Become a Seller"}</p>
                    </Link>
                    <div className='flex gap-6'>
                        {/* <img src={heart} className='w-[1.5rem] hidden sm:flex' alt="" /> */}
                        <SheetTrigger className={`${show && 'hidden'} sm:flex relative items-center`}>
                            <ShoppingCart strokeWidth={1.5} size={28} />
                            {cart?.length > 0 &&
                                <div className="absolute -top-0 -right-2 bg-red-500 min-w-5 p-[2.5px] flex items-center justify-center min-h-5 aspect-square rounded-full">
                                    <p className='text-sm'>{cart?.length < 100 ? cart?.length : "99+"}</p>
                                </div>}
                        </SheetTrigger>
                        {!userLoading && !userError ?
                            <img src={data.user.avatar.url} className='w-[2.5rem] h-auto aspect-square object-cover rounded-full hidden sm:flex' alt="" />
                            :
                            // <CircleUserRound size={32} strokeWidth={1.5} className="hidden sm:flex" />
                            <Link to='/auth/user/login' className='px-2 py-1 font-medium border-myprimary border-2 hover:bg-mysecondary hover:text-myprimary duration-200 rounded bg-myprimary text-mysecondary'>Log In</Link>
                        }
                    </div>
                </div>

                {/* <SheetTrigger>Open</SheetTrigger> */}
                <SheetContent className='p-0 pb-40 border-l-0 bg-myprimary'>
                    <SheetHeader className="p-4">
                        <SheetTitle className="flex gap-2"><ShoppingCart strokeWidth={1.5} size={28} /> My Cart</SheetTitle>
                        <Separator />
                    </SheetHeader>
                    <Cart />
                </SheetContent>
            </Sheet>

            {/* toggle menu */}
            <div className={`grid grid-col-1 row-start-2 col-span-full gap-4 transition-all duration-300 ease-in xl:hidden ${!show ? 'max-h-0 max-w-0 overflow-hidden pt-0' : 'max-h-[30rem] pt-8'}`}>
                <SearchInput getResult={getResult} className="w-ful" />
                <div className='flex flex-col sm:hidden gap-4 justify-between sm:justify-start w-full'>
                    {iconLinks.map(item => (
                        <div key={item.name} className={`flex gap-4 ${item?.styles}`}>
                            <img src={item.icon} className='w-[1.5rem]' alt="" />
                            <p className='font-popins font-medium active:bg-myprimary active:text-mysecondary'>{item.name}</p>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-1 items-center lg:hidden">
                    {links.map(item => (
                        <Link key={item.text} to={item.link} className='font-popins font-medium p-2 active:bg-myprimary active:text-mysecondary' >{item.text}</Link>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default Header