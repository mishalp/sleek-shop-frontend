import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { userMenu } from "../sideBar/userMenu"
import { useNavigate } from "react-router-dom"

export default function UserMenuSelector({ value }) {

    const navigate = useNavigate()
    const onSelect = (value) => {
        navigate(value)

    }

    return (
        <>
            <Select onValueChange={onSelect} className="md:hidden" defaultValue={value.link} >
                <SelectTrigger className="w-fit p-5 font-semibold text-lg md:hidden">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {userMenu.map((item, k) => (
                            <SelectItem key={k} value={item.link}>
                                <h2 className="items-center capitalize font-popins text-center flex gap-2">
                                    {item.icon}
                                    {item.title}
                                </h2>
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <h2 className="text-2xl max-md:hidden items-center capitalize font-bold font-popins text-center flex gap-2">
                {value.icon}
                {value.title}
            </h2>
        </>
    )
}
