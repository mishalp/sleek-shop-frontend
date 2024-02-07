import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import Input from '../input/Input'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useState } from 'react';
import avatar from '@/assets/icons/avatar.svg'
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

function FormInput({ form, label, id, className, onChange, type, name, handleImage, list, dp, ...props }) {

    const renderInputes = (field) => {
        switch (type) {
            case "password":
                return <PasswordInput field={field} />
            case "image":
                return <ImageInput form={form} name={name} handleImage={handleImage} display={dp} />
            case "textarea":
                return <Textarea {...field} />
            default:
                return <Input {...props} field={field} id={id} className={className} onChange={onChange} type={type} />
        }
    }

    if (type === "select") return <SelectInput form={form} name={name} list={list} label={label} />

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => {
                return (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            {renderInputes(field)}
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )
            }}
        />
    )
}

function PasswordInput({ field }) {
    const [show, setShow] = useState(false)
    return (
        <div className="relative">
            <Input type={show ? "text" : "password"} field={field} />
            {show ?
                <EyeOpenIcon onClick={() => setShow(false)} className="absolute bottom-3 scale-[1.2] cursor-pointer right-2" />
                :
                <EyeNoneIcon onClick={() => setShow(true)} className="absolute bottom-3 scale-[1.2] cursor-pointer right-2" />}
        </div>
    )
}

function ImageInput({ form, name, handleImage, display = true }) {

    const [dp, setDp] = useState(null)

    const handleFileInput = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setDp(reader.result)
            }
        }

        if (e.target.files.length > 0) {
            reader.readAsDataURL(e.target.files?.[0])
            form.setValue(name, e.target.files?.[0])
        }
    }
    return (
        <div className="flex items-center gap-8 relative">
            {display && <img src={dp ? dp : avatar} className="w-7 aspect-square object-cover rounded-full" alt="" />}
            <input
                type="file"
                className="sr-only"
                onChange={handleImage ? handleImage : handleFileInput}
                id={name}
            />
            <label htmlFor={name} className="text-sm cursor-pointer ring-0 rounded-md py-2 px-5 border border-input">Upload photo</label>
        </div>
    )
}

function SelectInput({ form, name, label, list }) {
    return <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
            <FormItem>
                <FormLabel>{label}</FormLabel>
                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder={`Select a ${label}`} />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {list.map((item, i) => (
                            <SelectItem key={i} value={item}>{item}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
        )}
    />
}

export default FormInput