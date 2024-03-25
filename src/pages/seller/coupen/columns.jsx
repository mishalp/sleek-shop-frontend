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
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            return <p >{row.getValue("name")}</p>
        },
    },
    {
        accessorKey: "discount",
        header: "Discount(%)",
        cell: ({ row }) => {
            return <p >{row.getValue("discount")}</p>
        },
    },
    {
        accessorKey: "minValue",
        header: "Min Price",
        cell: ({ row }) => {
            return <p >{row.getValue("minValue") || "N/A"}</p>
        },
    },
    {
        accessorKey: "maxValue",
        header: "Max Price",
        cell: ({ row }) => {
            return <p >{row.getValue("maxValue") || "N/A"}</p>
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