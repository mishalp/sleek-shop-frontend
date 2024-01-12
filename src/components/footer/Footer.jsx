import logo from '../../assets/icons/newLogo.svg'

import fb from '../../assets/icons/fb.svg'
import twitter from '../../assets/icons/twitter.svg'
import insta from '../../assets/icons/insta.svg'
import youtube from '../../assets/icons/youtube.svg'

import paypal from '../../assets/brands/paypal.png'
import visa from '../../assets/brands/visa.png'
import master from '../../assets/brands/master.png'
import stripe from '../../assets/brands/stripe.png'

const socials = [fb, twitter, insta, youtube]
const logos = [paypal, visa, master, stripe]

const footerLinks = [
    {
        title: "Company",
        links: [
            {
                link: '#',
                text: "About us"
            },
            {
                link: '#',
                text: "Careers"
            },
            {
                link: '#',
                text: "Store Locations"
            },
            {
                link: '#',
                text: "Our Blog"
            },
            {
                link: '#',
                text: "Reviews"
            },
        ]
    },
    {
        title: "Shop",
        links: [
            {
                link: '#',
                text: "Game & Video"
            },
            {
                link: '#',
                text: "Phone & Tablets"
            },
            {
                link: '#',
                text: "Computer & Laptop"
            },
            {
                link: '#',
                text: "Sport Watches"
            },
            {
                link: '#',
                text: "Events"
            },
        ]
    },
    {
        title: "Support",
        links: [
            {
                link: '#',
                text: "FAQ"
            },
            {
                link: '#',
                text: "Reviews"
            },
            {
                link: '#',
                text: "Contact Us"
            },
            {
                link: '#',
                text: "Shipping"
            },
            {
                link: '#',
                text: "Live chat"
            },
        ]
    },
]

function Footer() {
    return (
        <div className="px-4 sm:px-12 py-8 bg-secondary text-white flex flex-col gap-4">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 justify-center items-center">
                <div className="flex flex-col gap-4">
                    <img src={logo} className='max-w-24' alt="" />
                    <p className='text-lg '>The home and elements needed to create beutiful products.</p>
                    <div className="flex gap-4 items-center">
                        {socials.map((item, key) => (
                            <a href="#" key={key}>
                                <img src={item} className='' alt="" />
                            </a>
                        ))}
                    </div>
                </div>
                {footerLinks.map(item => (
                    <div className="flex flex-col gap-2" key={item.title}>
                        <h4 className='font-medium' >{item.title}</h4>
                        {item.links.map((item, key) => (
                            <a className='text-[#9D9D9D]' href={item.link} key={key}>{item.text}</a>
                        ))}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[auto,auto,auto] gap-4 p-4 px-6 justify-items-center text-[#9D9D9D] justify-between items-center"  >
                <p>© 2023 Mohammed Mishal</p>
                <p>Terms • Privacy • Policy</p>
                <div className="flex gap-2">
                    {logos.map((item, key) => (
                        <img src={item} key={key} className='w-auto h-8 bg-white p-1' alt="" />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Footer