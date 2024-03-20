import { Separator } from "@/components/ui/separator"
import { useParams } from "react-router-dom"
import SearchCard from "./SearchCard"

function FilterProducts({ products }) {
    const { search } = useParams()
    return (
        <div className="bg-white shadow-md h-fit md:min-h-[90vh] p-3 flex flex-col gap-1">
            <h2 className="font-popins text-lg font-semibold lg:text-xl">Showing results for "{search}”</h2>
            <Separator />
            <div className="flex flex-col gap-2 py-1 divide-y-2 divide-slate-200">
                {products.map((item, index) => (
                    <SearchCard product={item} key={item._id} />
                ))}
            </div>

        </div>
    )
}

export default FilterProducts