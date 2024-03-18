import Header from '@/components/header/Header'
import SideBar from '@/components/sideBar/SideBar'
import { ShoppingBag } from 'lucide-react'
import AllOrders from './AllOrders'
import { userMenu } from '@/components/sideBar/userMenu'
import UserMenuSelector from '@/components/userMenu/UserMenuSelector'

export default function Orders() {
    return (
        <div className='w-screen max-w-full min-h-[calc(100vh-5rem)] bg-myprimary'>
            <Header />
            <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] w-full mt-20">
                <SideBar role='user' active={1} />
                <div className="p-4 flex flex-col gap-2">
                    <UserMenuSelector value={userMenu[1]} />
                    <AllOrders />
                </div>
            </div>
        </div>
    )
}
