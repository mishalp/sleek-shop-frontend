import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import AddCoupenForm from "./AddCoupenForm"
import { useRef } from "react"

export default function CoupenDialog() {
    const ref = useRef()
    return (
        <AlertDialog >
            <AlertDialogTrigger className="flex">
                <Button className="ml-auto" >Add Coupen</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-transparent border-0 max-w-screen flex justify-center w-screen max-h-screen overflow-auto">
                <div className="bg-white h-full p-6 min-w-[80vw] md:min-w-[30rem] lg:min-w-[35rem] xl:min-w-[45rem] flex flex-col gap-6 shadow rounded">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-center text-xl">Add Coupen</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AddCoupenForm btnRef={ref} />
                    <AlertDialogFooter>
                        <AlertDialogCancel className="bg-red-500 text-white">Cancel</AlertDialogCancel>
                        <AlertDialogAction className='hidden' ref={ref} ></AlertDialogAction>
                    </AlertDialogFooter>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}
