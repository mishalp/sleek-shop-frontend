import { ShoppingBag } from "lucide-react"
import Header from "../components/Header/Header"
import SideBar from "../components/sideBar/SideBar"
import Page from "./Page"

function AllOrders() {
    return (
        <div className='w-screen max-w-full bg-myprimary'>
            <Header />
            <div className="grid grid-cols-[auto,1fr] w-full mt-20">
                <SideBar active={1} />
                <div className="p-4">
                    <h2 className="text-2xl font-bold font-popins text-center inline-flex ml-8 gap-2"><ShoppingBag size={32} strokeWidth={1.5} />All Orders</h2>
                    <Page />
                </div>
            </div>
        </div>
    )
}

export default AllOrders