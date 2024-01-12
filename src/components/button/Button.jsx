
function Button({ title, primary, className }) {
    return (
        <button className={`${primary ? 'text-primary bg-tertiory border-tertiory' : 'text-tertiory bg-primary border-tertiory'} duration-200 border-2 px-8 py-3 text-xl font-sans font-semibold rounded ${className}`} >
            {title}
        </button>
    )
}

export default Button