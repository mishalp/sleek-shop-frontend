
function MyButton({ title, primary, className, disabled, children, ...props }) {
    return (
        <button {...props} disabled={disabled} className={`${primary ? 'text-myprimary bg-mytertiory border-mytertiory' : 'text-mytertiory bg-myprimary border-mytertiory'} duration-200 border-2 px-8 py-3 text-xl font-sans font-semibold rounded ${disabled ? "opacity-50" : ""} ${className}`} >
            {title}
            {children}
        </button>
    )
}

export default MyButton