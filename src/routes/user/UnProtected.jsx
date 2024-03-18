import { useUserVerifyQuery } from "@/app/services/user"
import { Navigate, Outlet } from "react-router-dom"

function UnProtected() {
    const { isLoading, isError } = useUserVerifyQuery()
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