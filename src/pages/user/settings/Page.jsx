import { Button } from '@/components/ui/button'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Page() {
    const ref = useRef()
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('sleek_token')
        window.location.reload()
    }

    return (
        <div className="container py-10 bg-myprimary flex flex-col justify-center gap-5 items-center p-4">
            <AlertDialog >
                <AlertDialogTrigger className="flex">
                    <Button >Log out</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-transparent border-0 max-w-screen flex justify-center w-screen max-h-screen overflow-auto">
                    <div className="bg-white h-full p-6 min-w-[80vw] md:min-w-[30rem] lg:min-w-[35rem] xl:min-w-[45rem] flex flex-col gap-6 shadow rounded">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-xl">Log Out</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to Log out?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="bg-red-500 text-white">Cancel</AlertDialogCancel>
                            <AlertDialogAction ref={ref} className='hidden'  ></AlertDialogAction>
                            <Button onClick={logout}>Log Out</Button>
                        </AlertDialogFooter>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
