import { useSellerVerifyQuery } from "@/app/services/seller"
import { Navigate } from "react-router-dom"

function Protected({ children }) {
    const { isLoading, isError } = useSellerVerifyQuery()
    if (isLoading === true) {
        return <p>Loading</p>
    } else {
        if (!isError) {
            return children
        }
        return <Navigate to='/seller/login' />

    }
}

export default Protected