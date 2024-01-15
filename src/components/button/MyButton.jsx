
function MyButton({ title, primary, className }) {
    return (
        <button className={`${primary ? 'text-myprimary bg-mytertiory border-mytertiory' : 'text-mytertiory bg-myprimary border-mytertiory'} duration-200 border-2 px-8 py-3 text-xl font-sans font-semibold rounded ${className}`} >
            {title}
        </button>
    )
}

export default MyButton