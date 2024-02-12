import { useSellerVerifyQuery } from "@/app/services/seller"
import { Navigate, Outlet } from "react-router-dom"

function Protected() {
    const { isLoading, isError } = useSellerVerifyQuery()
    if (isLoading === true) {
        return <p>Loading seller</p>
    } else {
        if (!isError) {
            return <Outlet />
        }
        return <Navigate to='/auth/seller/login' />

    }
}

export default Protected