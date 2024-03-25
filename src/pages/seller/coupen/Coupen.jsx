import { GiftIcon } from "lucide-react"
import Header from "../components/Header/Header"
import SideBar from "../../../components/sideBar/SideBar"
import Page from "./Page"

export default function Coupen() {
    return (
        <div className='w-screen max-w-full bg-myprimary'>
            <Header />
            <div className="grid grid-cols-[auto,1fr] w-full mt-20">
                <SideBar role='seller' active={6} />
                <div className="p-4 w-full overflow-x-auto">
                    <h2 className="text-2xl font-bold font-popins text-center inline-flex ml-8 gap-2"><GiftIcon size={32} strokeWidth={1.5} />Coupen Codes</h2>
                    <Page />
                </div>
            </div>
        </div>
    )
}
