import { useSellerVerifyQuery } from "@/app/services/seller"
import { Navigate, Outlet } from "react-router-dom"

function UnProtected() {
    const { isLoading, isError } = useSellerVerifyQuery()
    if (isLoading === true) {
        return <p>loading unprotected</p>
    } else {
        if (!isError) {
            return <Navigate to='/' />
        }
        return <Outlet />
    }
}

export default UnProtected