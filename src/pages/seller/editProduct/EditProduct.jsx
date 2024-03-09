import Header from "../components/Header/Header"
import SideBar from "../../../components/sideBar/SideBar"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import EditForm from "./EditForm"
import { useNavigate } from "react-router-dom"

function EditProduct() {
    const navigate = useNavigate()
    return (
        <div className='w-screen max-w-full bg-myprimary'>
            <Header />
            <div className="grid grid-cols-[auto,1fr] w-full mt-20">
                <SideBar role='seller' active={2} />
                <div className="p-4 flex flex-col">
                    <div className="flex gap-2 mr-auto items-center">
                        <Button onClick={() => navigate('/seller/all-products')} className="rounded-full ml-8 p-2 h-auto w-auto">
                            <ArrowLeft />
                        </Button>
                        <h2 className="text-2xl font-bold font-popins text-center inline-flex gap-2">Edit Product</h2>
                    </div>
                    <div className="container mx-auto py-10">
                        <EditForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProduct