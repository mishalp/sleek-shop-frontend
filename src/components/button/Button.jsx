
function Button({ title, primary }) {
    return (
        <button className={`${primary ? 'text-primary bg-tertiory' : 'text-tertiory bg-primary'} px-8 py-3 text-xl font-sans font-semibold rounded-full`} >
            {title}
        </button>
    )
}

export default Button