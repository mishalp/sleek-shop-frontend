import { ArrowUpDown, Eye, FilePenLine, MoreHorizontal, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useDeleteProductMutation } from "@/app/services/products"
import { useNavigate } from "react-router-dom"


export const columns = [
    {
        accessorKey: "_id",
        header: "ID",
        cell: ({ row }) => {
            const id = row.getValue("_id")
            return <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger className="flex">
                        <p className="overflow-hidden max-h-4 text-left">{id.substring(0, 10)}{id.length > 10 && "..."}</p>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[20rem]" >
                        <p>{id}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        },
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    className="p-0"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const name = row.getValue("name")
            return <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger className="flex">
                        <p className="overflow-hidden max-h-4 text-left">{name.substring(0, 25)}{name.length > 25 && "..."}</p>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[20rem]" >
                        <p>{name}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        },
    },
    {
        accessorKey: "price",
        header: ({ column }) => {
            return (
                <Button
                    className="p-0"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"))
            const formatted = new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
            }).format(price)

            return <div className="font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "stock",
        header: ({ column }) => {
            return (
                <Button
                    className="p-0"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Stock
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "category",
        header: "Category"
    },
    {
        accessorKey: "sold_out",
        header: ({ column }) => {
            return (
                <Button
                    className="p-0"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Sold Out
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "images",
        header: "Image",
        cell: ({ row }) => {
            const images = row.getValue("images")
            return <img src={images[0]?.url} className="aspect-square object-contain w-[4rem] h-auto" alt="" />
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const product = row.original
            return (
                <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        {/* <DropdownMenuSeparator /> */}
                        <ViewProduct id={product._id} />
                        <EditProduct id={product._id} />
                        <DeleteProduct id={product._id} />
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

function DeleteProduct({ id }) {
    const [deleteProduct, { isLoading }] = useDeleteProductMutation();

    const deleteHnadler = (e) => {
        e.preventDefault()
        deleteProduct(id)
    }

    return <DropdownMenuItem
        disabled={isLoading}
        onSelect={(e) => e.preventDefault()}
    ><AlertDialog className="overflow-auto">
            <AlertDialogTrigger className="flex gap-2 items-center"><Trash2 size={16} color="red" />Delete</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your product
                        and remove from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={isLoading} onClick={deleteHnadler} >{isLoading ? "Deleting..." : "Continue"}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </DropdownMenuItem>
}

function EditProduct({ id }) {
    const navigate = useNavigate()
    return (
        <DropdownMenuItem
            className="flex gap-2 items-center"
            onSelect={() => navigate(`/seller/product/edit/${id}`)}
        >
            <FilePenLine size={16} color="blue" />Edit
        </DropdownMenuItem>
    )
}

function ViewProduct({ id }) {
    const navigate = useNavigate()
    return <DropdownMenuItem
        className="flex gap-2 items-center"
        onSelect={() => navigate(`/products/${id}`)}
    >
        <Eye size={16} />
        View
    </DropdownMenuItem>
}