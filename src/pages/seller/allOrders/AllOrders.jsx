import Header from "../components/Header/Header"
import SideBar from "../components/sideBar/SideBar"

function AllOrders() {
    return (
        <div className='w-screen max-w-full bg-myprimary'>
            <Header />
            <div className="grid grid-cols-[auto,1fr] w-full mt-20">
                <SideBar active={1} />
                <div className="p-4">
                    <h1>All Orders</h1>
                </div>
            </div>
        </div>
    )
}

export default AllOrders