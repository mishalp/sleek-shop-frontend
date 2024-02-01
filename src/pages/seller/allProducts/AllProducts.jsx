import { Package } from "lucide-react"
import Header from "../components/Header/Header"
import SideBar from "../components/sideBar/SideBar"
import Page from "./Page"

function AllProducts() {
    return (
        <div className='w-screen max-w-full bg-myprimary'>
            <Header />
            <div className="grid grid-cols-[auto,1fr] w-full mt-20">
                <SideBar active={2} />
                <div className="p-4 flex flex-col">
                    <h2 className="text-2xl font-bold font-popins text-center inline-flex mx-auto gap-2"><Package size={32} strokeWidth={1.5} />All Products</h2>
                    <Page />
                </div>
            </div>
        </div>
    )
}

export default AllProducts