import Header from "../components/Header/Header"
import SideBar from "@/components/sideBar/SideBar"
import ProductForm from "./ProductForm"

function CreateProduct() {
    return (
        <div className='w-screen max-w-full bg-myprimary'>
            <Header />
            <div className="grid grid-cols-[auto,1fr] w-full mt-20 relative">
                <SideBar role='seller' active={3} />
                <div className="p-4 flex flex-col items-center">
                    <ProductForm />
                </div>
            </div>
        </div>
    )
}

export default CreateProduct