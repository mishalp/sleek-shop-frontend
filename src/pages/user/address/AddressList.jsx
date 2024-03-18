import { useUserVerifyQuery } from "@/app/services/user"
import AddressDialog from "./AddressDialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default function AddressList() {
    const { data, isLoading: userLoading, isError: userError } = useUserVerifyQuery()
    return (
        <div className="container py-10 bg-myprimary flex flex-col justify-center gap-5 p-4">
            <AddressDialog />
            <div className="flex flex-col gap-2">
                {!userLoading && !userError ?
                    <>
                        {data.user.addresses.map((item, i) => (
                            <div key={i} className="p-4 flex max-md:flex-col gap-3 bg-white justify-between md:items-center rounded shadow-sm">
                                <p className="font-semibold">{item.fullname}</p>
                                <p>{item.address}</p>
                                <Button className="bg-red-500 w-auto">
                                    <Trash2 size={20} />
                                </Button>
                            </div>
                        ))}
                    </>
                    : !userError && userLoading ?
                        <>
                            {['', '', '', ''].map((item, i) => (
                                <Skeleton className="p-4 flex justify-between items-center rounded-md shadow-sm bg-gray-200">
                                    <Skeleton className="w-16 h-8" />
                                    <Skeleton className="w-16 h-8" />
                                </Skeleton>
                            ))}
                        </>
                        :
                        ""
                }
            </div>
        </div>
    )
}
