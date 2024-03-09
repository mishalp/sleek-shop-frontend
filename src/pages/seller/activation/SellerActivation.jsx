import { setSellerToken } from "@/app/features/auth"
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
                    localStorage.setItem("sleek_seller_token", JSON.stringify(data.token))
                    dispath(setSellerToken(data.token))
                    navigate('/seller/dashboard')
                } catch (error) {
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