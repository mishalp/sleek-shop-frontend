import { useSelector } from "react-redux"
import { columns } from "./columns"
import { DataTable } from "./data-table"

function Page() {
    const products = useSelector(state => state.products.products)
    console.log(products);
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={products} />
        </div>
    )
}

export default Page