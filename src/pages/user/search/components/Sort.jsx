import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

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


function Sort({ sortValue, setSortValue }) {

    return (
        <RadioGroup onValueChange={(value) => setSortValue(value)} value={sortValue} defaultValue="az">
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