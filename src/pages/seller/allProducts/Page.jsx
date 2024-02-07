import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useGetShopProdcutsQuery } from "@/app/services/products"
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useSellerVerifyQuery } from "@/app/services/seller"

function Page() {
    const { data: { user } } = useSellerVerifyQuery()
    const { data, refetch, isLoading, isFetching } = useGetShopProdcutsQuery(user._id)
    return (
        <div className="container mx-auto py-10">
            <Button disabled={isLoading || isFetching} onClick={() => refetch()}>
                {isLoading || isFetching ? <><ReloadIcon className="mr-2 h-4 w-4 animate-spin" />Refreshing</> : "Refresh"}
            </Button>
            <DataTable columns={columns} data={data ? data.products : []} />
        </div>
    )
}

export default Page