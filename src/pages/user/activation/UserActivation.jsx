import { setUserToken } from "@/app/features/auth"
import { useUserActivateMutation } from "@/app/services/user"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

function UserActivation() {

    const { activationToken } = useParams()
    const [error, setError] = useState(false)
    const [activate] = useUserActivateMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (activationToken) {
            const checkToken = async () => {
                try {
                    const data = await activate({ activationToken }).unwrap()
                    localStorage.setItem("sleek_token", JSON.stringify(data.token))
                    dispatch(setUserToken(data.token))
                    navigate('/')
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

export default UserActivation