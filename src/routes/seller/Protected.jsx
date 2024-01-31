import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function Protected({ children }) {
    const { isAuthenticated, loading } = useSelector(state => state.seller)
    if (loading === true) {
        return <p>Loading</p>
    } else {
        if (isAuthenticated) {
            return children
        }
        return <Navigate to='/seller/login' />

    }
}

export default Protected