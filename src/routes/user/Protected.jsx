import { useUserVerifyQuery } from "@/app/services/user"
import { Navigate, Outlet } from "react-router-dom"

function Protected() {
    const { isLoading, isError } = useUserVerifyQuery()
    if (isLoading === true) {
        return <p>Loading seller</p>
    } else {
        if (!isError) {
            return <Outlet />
        }
        return <Navigate to='/auth/user/login' />

    }
}

export default Protected