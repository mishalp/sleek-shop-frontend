import { BanknoteIcon, CalendarPlus, Gift, GiftIcon, LayoutDashboard, MessageSquareMore, Package, PackagePlus, Settings, ShoppingBag, Ticket } from "lucide-react"

const size = 32, strokeWidth = 1.5;

export const shopMenu = [
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
    // {
    //     title: "Create Event",
    //     icon: <CalendarPlus size={size} strokeWidth={strokeWidth} />,
    //     link: '/seller/create-event'
    // },
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