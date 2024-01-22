import { sellerFailed, setSeller } from "@/features/seller"
import { useSellerActivateMutation } from "@/app/services/seller"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

function SellerActivation() {

    const { activationToken } = useParams()
    const [error, setError] = useState(false)
    const dispath = useDispatch()
    const [activate] = useSellerActivateMutation()
    const navigate = useNavigate()

    useEffect(() => {
        if (activationToken) {
            const checkToken = async () => {
                try {
                    const data = await activate({ activationToken }).unwrap()
                    dispath(setSeller(data))
                    navigate('/seller/dashboard')
                } catch (error) {
                    dispath(sellerFailed())
                    console.log(error);
                    setError(true)
                }
            }
            checkToken()
        }
    }, [])

    return (
        <div className="w-screen max-w-full min-h-screen flex items-center justify-center">
            {error ? <p>Your Token has expired!</p>
                :
                <p>Your account has been created suceessfully!</p>}
        </div>
    )
}

export default SellerActivation