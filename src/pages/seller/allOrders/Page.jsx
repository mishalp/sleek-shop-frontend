import { columns } from "./columns"
import { DataTable } from "./data-table"
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useGetAllSellerOrderQuery } from "@/app/services/order"

function Page() {
    const { data, refetch, isLoading, isFetching } = useGetAllSellerOrderQuery()

    return (
        <div className="container mx-auto py-10">
            <Button disabled={isLoading || isFetching} onClick={() => refetch()}>
                {isLoading || isFetching ? <><ReloadIcon className="mr-2 h-4 w-4 animate-spin" />Refreshing</> : "Refresh"}
            </Button>
            <DataTable columns={columns} data={data ? data.orders : []} />
        </div>
    )
}

export default Page