import { useRef, useState } from "react"
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
import { Star } from "lucide-react"
import { Button } from "../ui/button"
import { formatPrice } from "@/utils/utils"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAddReviewMutation } from "@/app/services/products"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useToast } from "../ui/use-toast"


export function ReviewDialog({ product, orderId }) {

    const ref = useRef()
    const { toast } = useToast()
    const [addReview, { isLoading }] = useAddReviewMutation()
    const [fill, setFill] = useState(["#F6BB33", "#F6BB33", "#F6BB33", "#F6BB33", "#F6BB33"])
    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState("")

    const fillStar = (val) => {
        setRating(val + 1)
        setFill(fill.map((item, i) => {
            if (i <= val) return "#F6BB33"
            return "#fff"
        }))
    }

    const submitRating = async () => {
        try {
            const res = await addReview({
                rating,
                comment,
                prodId: product._id,
                orderId
            }).unwrap()

            toast({
                variant: "success",
                title: res.message,
            })

            window.location.reload()

        } catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Error",
                description: error.data.message || "",
            })
        }
    }

    return <AlertDialog >
        <AlertDialogTrigger className="flex">
            <Button className="ml-auto" >Write a Review</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-transparent border-0 max-w-screen flex justify-center w-screen max-h-screen overflow-auto">
            <div className="bg-white h-full p-6 flex flex-col gap-6 shadow md:w-[35rem] lg:w-[40rem] xl:w-[45rem] rounded">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-center text-xl">Give a Review</AlertDialogTitle>
                </AlertDialogHeader>
                <div className="flex gap-2">
                    <img src={product.images[0].url} className='w-20 aspect-square object-contain mix-blend-multiply' alt="" />
                    <div className="flex flex-col gap-2">
                        <p className="font-semibold w-full max-md:line-clamp-3 ">{product.name}</p>
                        <p>{product.qty} x {formatPrice(product.price)} = {formatPrice(product.price * product.qty)}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <h3>Give Rating <span className="text-red-500">*</span></h3>
                    <div className="flex gap-3">
                        {fill.map((item, i) => (
                            <Star color="#F6BB33" onClick={() => fillStar(i)} fill={item} />
                        ))}
                    </div>
                    <div className="">
                        <Label htmlFor="message">Write a comment</Label>
                        <Textarea onChange={(e) => setComment(e.target.value)} placeholder="Type your message here." id="message" />
                    </div>
                    <Button onClick={submitRating} disabled={isLoading} >
                        {isLoading ? <><ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please wait</> : "Submit"}
                    </Button>
                </div>
                {/* <AddressForm btnRef={ref} /> */}
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-red-500 text-white">Cancel</AlertDialogCancel>
                    <AlertDialogAction className='hidden' ref={ref} ></AlertDialogAction>
                </AlertDialogFooter>
            </div>
        </AlertDialogContent>
    </AlertDialog>

}