import { Input as ShadInp } from '@/components/ui/input'

function Input({ field, type, className, onChange, id, ...props }) {
    return (
        <ShadInp
            {...props}
            id={id}
            onChange={onchange}
            type={type}
            field={field}
            className={`focus-visible:ring-1 !ring-offset-0 !ring-mytertiory ${className}`}
        />
    )
}

export default Input