import { useSellerVerifyQuery } from '@/app/services/seller'
import { sellerFailed, setSeller } from '@/features/seller'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function useLoadApp() {
    const dispath = useDispatch()
    const { data, isLoading, isError } = useSellerVerifyQuery()

    useEffect(() => {
        if (!isLoading) {
            if (!isError) {
                dispath(setSeller(data))
            } else {
                dispath(sellerFailed())
            }
        }
    }, [isLoading])
    return isLoading
}

export default useLoadApp