import { ArrowRight, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { formatPrice } from "@/utils/utils"

export const columns = [
    {
        accessorKey: "_id",
        header: "ID",
        cell: ({ row }) => {
            const id = row.getValue("_id")
            return <p className="overflow-hidden max-h-4 text-left">{id}</p>
        },
    },
    {
        accessorKey: "user",
        header: "User",
        cell: ({ row }) => {
            const user = row.getValue("user")
            return <p >{user.name}</p>
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    className="p-0"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const status = row.getValue("status")
            return <p className="text-left">{status}</p>
        },
    },
    {
        accessorKey: "totalPrice",
        header: ({ column }) => {
            return (
                <Button
                    className="p-0"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Total Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const total = row.getValue("totalPrice")
            return <div className="font-medium">{formatPrice(total)}</div>
        },
    },
    {
        accessorKey: "item qty",
        header: "Item Qty",
        cell: ({ row }) => {
            const cart = row.original.cart
            return <div className="font-medium">{cart.length}</div>
        },
    },
    {
        id: "view",
        header: "View",
        cell: ({ row }) => {
            const id = row.getValue("_id")
            const navigate = useNavigate()
            return (
                <button onClick={() => navigate(`/seller/order/${id}`)} className="hover:bg-gray-300 p-2 rounded duration-200" >
                    <ArrowRight />
                </button>
            )
        },
    },
]