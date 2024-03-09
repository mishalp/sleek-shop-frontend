import Header from '@/components/header/Header'
import SideBar from '@/components/sideBar/SideBar'
import { ShoppingBag } from 'lucide-react'
import AllOrders from './AllOrders'

export default function Orders() {
    return (
        <div className='w-screen max-w-full bg-myprimary'>
            <Header />
            <div className="grid grid-cols-[auto,1fr] w-full mt-20">
                <SideBar role='user' active={1} />
                <div className="p-4 w-full">
                    <h2 className="text-2xl font-bold font-popins text-center inline-flex ml-8 gap-2"><ShoppingBag size={32} strokeWidth={1.5} />Orders</h2>
                    <AllOrders />
                </div>
            </div>
        </div>
    )
}
