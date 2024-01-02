
function Button({ title, primary, className }) {
    return (
        <button className={`${primary ? 'text-primary bg-tertiory' : 'text-tertiory bg-primary'} px-8 py-3 text-xl font-sans font-semibold rounded-full ${className}`} >
            {title}
        </button>
    )
}

export default Button