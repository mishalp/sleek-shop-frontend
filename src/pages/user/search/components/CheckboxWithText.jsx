import { Checkbox } from "@/components/ui/checkbox";

export function CheckboxWithText({ name, value }) {
    return (
        <div className="items-top flex space-x-2">
            <Checkbox id={value} />
            <div className="grid gap-1.5 leading-none">
                <label
                    htmlFor={value}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    {name}
                </label>
            </div>
        </div>
    )
}