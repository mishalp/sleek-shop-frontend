import logo from '../../assets/icons/newLogo.svg'
import shope from '../../assets/icons/shope.svg'
import SearchInput from '../searchInput/SearchInput'

import heart from '../../assets/icons/heart.svg'
import cart from '../../assets/icons/cart.svg'
import profile from '../../assets/icons/profile.svg'
import menu from '../../assets/icons/menu.svg'

const links = [
    {
        text: "Home",
        link: "#"
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


function HomeNav() {
    return (
        <div className="w-full text-white text-lg justify-between items-center bg-secondary p-4 lg:px-8 fixed sm:flex sm:justify-between grid grid-cols-3">
            <img src={menu} alt="" className='sm:hidden w-7' />
            <div className="flex gap-6 justify-center">
                <img src={logo} className='w-20' alt="" />
                <SearchInput className='hidden xl:flex' />
            </div>

            <div className="gap-6 items-center justify-self-center hidden sm:flex">
                {links.map(item => (
                    <a key={item.text} href={item.link} className='font-popins font-medium' >{item.text}</a>
                ))}
            </div>

            <div className="flex gap-8 justify-end md:justify-center">
                <div className='gap-2 items-center hidden lg:flex'>
                    <img src={shope} className='w-[1.5rem]' alt="" />
                    <a href="#" className='font-popins font-medium' >Become a Seller</a>
                </div>
                <div className='flex gap-6 items-center'>
                    <img src={heart} className='w-[1.5rem] hidden sm:flex' alt="" />
                    <img src={cart} className='w-[1.5rem]' alt="" />
                    <img src={profile} className='w-[1.5rem] hidden sm:flex' alt="" />
                </div>
            </div>
        </div>
    )
}

export default HomeNav