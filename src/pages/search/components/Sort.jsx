import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const sortBy = [
    {
        name: "A-Z",
        value: "az"
    },
    {
        name: "Popularity",
        value: "p"
    },
    {
        name: "Price Low to High",
        value: "lh"
    },
    {
        name: "Price High to Low",
        value: "hl"
    },
    {
        name: "Newest First",
        value: "n"
    },
]


function Sort({ setFilteredProducts, setProducts }) {

    const [sortValue, setSortValue] = useState("az")

    const sort = (value) => {
        setSortValue(value)
        switch (value) {
            case "az": setFilteredProducts((prev) => prev.toSorted((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1))
                setProducts((prev) => prev.toSorted((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1))
                break;
            case "p": setFilteredProducts((prev) => prev.toSorted((a, b) => a.sold_out > b.sold_out ? -1 : 1))
                setProducts((prev) => prev.toSorted((a, b) => a.sold_out > b.sold_out ? -1 : 1))
                break;
            case "lh": setFilteredProducts((prev) => prev.toSorted((a, b) => a.price < b.price ? -1 : 1))
                setProducts((prev) => prev.toSorted((a, b) => a.price < b.price ? -1 : 1))
                break;
            case "hl": setFilteredProducts((prev) => prev.toSorted((a, b) => a.price > b.price ? -1 : 1))
                setProducts((prev) => prev.toSorted((a, b) => a.price > b.price ? -1 : 1))
                break;
            case "n": setFilteredProducts((prev) => prev.toSorted((a, b) => new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime() ? -1 : 1))
                setProducts((prev) => prev.toSorted((a, b) => new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime() ? -1 : 1))
                break;
        }
    }

    const { search } = useParams()

    useEffect(() => {
        setSortValue(sortValue)
        setTimeout(() => sort(sortValue), 1000)
    }, [search])

    return (
        <RadioGroup onValueChange={sort} value={sortValue} defaultValue="az">
            {sortBy.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 cursor-pointer">
                    <RadioGroupItem value={item.value} id={item.value} />
                    <Label className="cursor-pointer" htmlFor={item.value}>{item.name}</Label>
                </div>
            ))}
        </RadioGroup>
    )
}

export default Sort