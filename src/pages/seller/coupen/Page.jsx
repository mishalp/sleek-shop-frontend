import { Button } from '@/components/ui/button'
import { ReloadIcon } from '@radix-ui/react-icons'
import { DataTable } from './data-table'
import { columns } from './columns'
import CoupenDialog from './CoupenDialog'
import { useGetAllCouponQuery } from '@/app/services/coupon'

export default function Page() {

    const { data, refetch, isLoading, isFetching } = useGetAllCouponQuery()
    console.log(data);

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between gap-4">
                <Button disabled={isLoading || isFetching} onClick={() => refetch()}>
                    {isLoading || isFetching ? <><ReloadIcon className="mr-2 h-4 w-4 animate-spin" />Refreshing</> : "Refresh"}
                </Button>
                <CoupenDialog />
            </div>
            <DataTable columns={columns} data={data ? data.couponCodes : []} />
        </div>
    )
}
