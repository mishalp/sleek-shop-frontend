import Header from "../components/Header/Header"
import SideBar from "../components/sideBar/SideBar"

function AllProducts() {
    return (
        <div className='w-screen max-w-full bg-myprimary'>
            <Header />
            <div className="grid grid-cols-[auto,1fr] w-full mt-20">
                <SideBar active={2} />
                <div className="p-4">
                    <h1>All Products</h1>
                </div>
            </div>
        </div>
    )
}

export default AllProducts