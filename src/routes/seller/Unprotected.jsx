import { useSellerVerifyQuery } from "@/app/services/seller"
import { Navigate, Outlet } from "react-router-dom"

function Unprotected() {
    const { isLoading, isError } = useSellerVerifyQuery()
    if (isLoading === true) {
        return <p>loading unprotected</p>
    } else {
        if (!isError) {
            return <Navigate to='/seller/dashboard' />
        }
        return <Outlet />
    }
}

export default Unprotected