import { setUserToken } from "@/app/features/auth"
import { useUserActivateMutation } from "@/app/services/user"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import authBg from '@/assets/images/bg.svg'
import logo from '@/assets/icons/newLogo.svg'

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
        <div style={{ backgroundImage: `url(${authBg})` }} className="bg-cover text-center flex-col text-xl text-white bg-center w-screen max-w-full min-h-screen flex pt-40 items-center">
            {error ? <p>Your Token has expired!</p>
                :
                <p>Your account has been created suceessfully!</p>}
            <img src={logo} className='w-28 mt-16' alt="" />
        </div>
    )
}

export default UserActivation