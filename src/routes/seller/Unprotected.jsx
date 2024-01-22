import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function Unprotected({ children }) {

    const { isAuthenticated, loading } = useSelector(state => state.seller)

    if (loading === false) {
        if (isAuthenticated) {
            return <Navigate to='/seller/dashboard' />
        }
        return children
    }
}

export default Unprotected