import { Separator } from "@/components/ui/separator"
import { CheckboxWithText } from "./CheckboxWithText"
import FilterMenu from "./Filter"
import Sort from "./Sort"
import Minmax from "./Minmax"

const rating = [
    {
        name: "4★ & above",
        value: 4,
    },
    {
        name: "3★ & above",
        value: 3,
    },
    {
        name: "2★ & above",
        value: 2,
    },
    {
        name: "1★ & above",
        value: 1,
    },
]

const discount = [
    {
        name: "50% or more",
        value: 50,
    },
    {
        name: "40% or more",
        value: 40,
    },
    {
        name: "20% or more",
        value: 20,
    },
    {
        name: "10% or more",
        value: 10,
    },
]

function FilterBar({ minmax, minmaxValues, sortValue, setSortValue, setFilters, filters, className }) {

    return (
        <div className={`bg-white shadow-md py-2 flex flex-col min-w-60 max-h-screen overflow-auto h-fit ${className}`}>
            <h2 className="p-3 font-semibold text-xl">Filters</h2>
            <Separator />
            <FilterMenu title="Sort By">
                <Sort
                    sortValue={sortValue}
                    setSortValue={setSortValue}
                />
            </FilterMenu>
            <Separator />
            <FilterMenu title="Price">
                <Minmax
                    minmax={minmax}
                    minmaxValues={minmaxValues}
                    setFilters={setFilters}
                    filters={filters}
                />
            </FilterMenu>
            <Separator />
            <FilterMenu title="Rating">
                <div className="flex flex-col gap-2">
                    {rating.map((item, index) => (
                        <CheckboxWithText key={index} name={item.name} value={item.value} />
                    ))}
                </div>
            </FilterMenu>
            <Separator />
            <FilterMenu title="Discount">
                <div className="flex flex-col gap-2">
                    {discount.map((item, index) => (
                        <CheckboxWithText key={index} name={item.name} value={item.value} />
                    ))}
                </div>
            </FilterMenu>
        </div>
    )
}

export default FilterBar