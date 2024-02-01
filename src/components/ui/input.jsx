import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, onChange, field, type, id, ...props }, ref) => {
  return (
    (<input
      type={type}
      id={id}
      onChange={onChange}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...field}
      ref={ref}
      {...props} />)
  );
})
Input.displayName = "Input"

export { Input }

function MyInput({ field, type, className, onChange, id, ...props }) {
  return (
    <Input
      {...props}
      id={id}
      onChange={onchange}
      type={type}
      field={field}
      className={`focus-visible:ring-1 !ring-offset-0 !ring-mytertiory ${className}`}
    />
  )
}

export { MyInput }
