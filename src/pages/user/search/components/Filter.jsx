
function FilterMenu({ title, children }) {
    return (
        <div className="p-4 flex flex-col gap-2">
            <h3 className="font-medium text-lg">{title}</h3>
            {children}
        </div>
    )
}

export default FilterMenu