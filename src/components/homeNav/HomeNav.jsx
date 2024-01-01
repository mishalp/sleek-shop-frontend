import logo from '../../assets/icons/newLogo.svg'
import shope from '../../assets/icons/shope.svg'
import SearchInput from '../searchInput/SearchInput'

import heart from '../../assets/icons/heart.svg'
import cart from '../../assets/icons/cart.svg'
import profile from '../../assets/icons/profile.svg'
import menu from '../../assets/icons/menu.svg'
import { useState } from 'react'

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

    const [show, setShow] = useState(false)

    return (
        <div className={`w-full text-white text-lg justify-between items-center bg-secondary p-4 lg:px-8 fixed sm:grid-cols-[auto,1fr,auto] lg:grid-cols-[auto,1fr,auto,auto] xl:grid-cols-3 gap-x-8 grid grid-cols-3`}>
            <img src={menu} alt="" className='xl:hidden w-7' onClick={() => setShow(!show)} />
            <div className="flex gap-6 justify-center sm:justify-self-start">
                <img src={logo} className='w-20' alt="" />
                <SearchInput className='hidden xl:flex' />
            </div>

            <div className="gap-6 items-center justify-self-center hidden lg:flex">
                {links.map(item => (
                    <a key={item.text} href={item.link} className='font-popins font-medium' >{item.text}</a>
                ))}
            </div>

            <div className="flex gap-6 justify-end lg:justify-center">
                <div className='gap-2 items-center hidden sm:flex'>
                    <img src={shope} className='w-[1.5rem]' alt="" />
                    <a href="#" className='font-popins font-medium' >Become a Seller</a>
                </div>
                <div className='flex gap-4'>
                    <img src={heart} className='w-[1.5rem] hidden sm:flex' alt="" />
                    <img src={cart} className={`w-[1.5rem] ${show && 'hidden'} sm:flex`} alt="" />
                    <img src={profile} className='w-[1.5rem] hidden sm:flex' alt="" />
                </div>
            </div>

            <div className={`grid grid-col-1 row-start-2 col-span-full gap-6 transition-all duration-300 ease-in xl:hidden ${!show ? 'max-h-0 max-w-0 overflow-hidden pt-0' : 'max-h-96 pt-8'}`}>
                <div className='gap-2 items-center flex sm:hidden'>
                    <img src={shope} className='w-[1.5rem]' alt="" />
                    <a href="#" className='font-popins font-medium' >Become a Seller</a>
                </div>
                <div className='flex sm:hidden gap-8 items-center justify-between sm:justify-start w-full'>
                    <img src={heart} className='w-[1.5rem]' alt="" />
                    <img src={cart} className='w-[1.5rem]' alt="" />
                    <img src={profile} className='w-[1.5rem]' alt="" />
                </div>
                <SearchInput className="w-ful" />
                <div className="grid grid-cols-1 items-center lg:hidden">
                    {links.map(item => (
                        <a key={item.text} href={item.link} className='font-popins font-medium p-2 active:bg-primary active:text-secondary' >{item.text}</a>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomeNav