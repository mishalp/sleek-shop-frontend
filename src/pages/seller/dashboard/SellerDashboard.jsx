import Header from "../components/Header/Header"
import SideBar from "../../../components/sideBar/SideBar"

function SellerDashboard() {
    return (
        <div className='w-screen max-w-full bg-myprimary'>
            <Header />
            <div className="grid grid-cols-[auto,1fr] w-full mt-20">
                <SideBar role='seller' active={0} />
                <div className="p-4">
                    <h1>Overview</h1>
                </div>
            </div>
        </div>
    )
}

export default SellerDashboard