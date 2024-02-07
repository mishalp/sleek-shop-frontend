import { BanknoteIcon, CalendarPlus, Gift, GiftIcon, LayoutDashboard, MessageSquareMore, Package, PackagePlus, Settings, ShoppingBag, Ticket } from "lucide-react"
import { Link } from "react-router-dom";

const size = 32, strokeWidth = 1.5;

const menu = [
    {
        title: "Dashboard",
        icon: <LayoutDashboard size={size} strokeWidth={strokeWidth} />,
        link: '/seller/dashboard'
    },
    {
        title: "All Orders",
        icon: <ShoppingBag size={size} strokeWidth={strokeWidth} />,
        link: '/seller/all-orders'
    },
    {
        title: "All Products",
        icon: <Package size={size} strokeWidth={strokeWidth} />,
        link: '/seller/all-products'
    },
    {
        title: "Create Product",
        icon: <PackagePlus size={size} strokeWidth={strokeWidth} />,
        link: '/seller/create-product'
    },
    {
        title: "Create Event",
        icon: <CalendarPlus size={size} strokeWidth={strokeWidth} />,
        link: '/seller/create-event'
    },
    {
        title: "Withdraw Money",
        icon: <BanknoteIcon size={size} strokeWidth={strokeWidth} />,
        link: '/seller/withdraw'
    },
    {
        title: "Shop Inbox",
        icon: <MessageSquareMore size={size} strokeWidth={strokeWidth} />,
        link: '/seller/inbox'
    },
    {
        title: "Discount Code",
        icon: <GiftIcon size={size} strokeWidth={strokeWidth} />,
        link: '/seller/coupens'
    },
    {
        title: "Refund",
        icon: <Ticket size={size} strokeWidth={strokeWidth} />,
        link: '/seller/refund'
    },
    {
        title: "Settings",
        icon: <Settings size={size} strokeWidth={strokeWidth} />,
        link: '/seller/settings'
    },
]

function SideBar({ active }) {

    return (
        <div className="flex flex-col bg-white min-w-64 h-[calc(100vh-5rem)] sticky top-[5rem] left-0 overflow-auto">
            <div className="bg-myprimary">
                {menu.map((item, index) => (
                    <Link key={index} to={item.link}
                        className={`${active === index ? "bg-myprimary z-[1]" : active - 1 === index ? "rounded-br-3xl bg-white shadow z-[2]" : active + 1 === index ? "rounded-tr-3xl bg-white shadow z-[2]" : "bg-white shadow z-[2]"} p-4 flex relative ${index === menu.length - 1 ? 'shadow-none' : ''} items-center gap-2`}
                    >
                        {item.icon}
                        <p className={`text-lg`}>{item.title}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SideBar
