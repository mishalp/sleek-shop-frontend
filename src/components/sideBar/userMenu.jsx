import { BanknoteIcon, CalendarPlus, Gift, GiftIcon, LayoutDashboard, LockKeyhole, MessageSquareMore, NotebookTabs, Package, PackagePlus, Radar, Settings, ShoppingBag, Ticket, UserRound } from "lucide-react"

const size = 32, strokeWidth = 1.5;

export const userMenu = [
    {
        title: "Profile",
        icon: <UserRound size={size} strokeWidth={strokeWidth} />,
        link: '/user/profile'
    },
    {
        title: "Orders",
        icon: <ShoppingBag size={size} strokeWidth={strokeWidth} />,
        link: '/user/orders'
    },
    {
        title: "Refunds",
        icon: <Ticket size={size} strokeWidth={strokeWidth} />,
        link: '/user/refund'
    },
    {
        title: "Change Password",
        icon: <LockKeyhole size={size} strokeWidth={strokeWidth} />,
        link: '/user/change-password'
    },
    {
        title: "Address",
        icon: <NotebookTabs size={size} strokeWidth={strokeWidth} />,
        link: '/seller/create-event'
    },
    {
        title: "Settings",
        icon: <Settings size={size} strokeWidth={strokeWidth} />,
        link: '/user/settings'
    },
]