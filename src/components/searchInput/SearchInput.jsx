import search from '../../assets/icons/search.svg'

function SearchInput({ className }) {
    return (
        <div className={`bg-white text-black p-1 px-2 grid grid-cols-[auto_1fr] h-fit gap-3 rounded ${className}`}>
            <img src={search} className='w-8' alt="" />
            <input type="text" className='text-lg outline-none w-full' placeholder='Search for products' name="" id="" />
        </div >
    )
}

export default SearchInput