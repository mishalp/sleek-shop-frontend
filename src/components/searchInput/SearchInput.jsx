import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function SearchInput({ getResult, className, ...props }) {
    const location = useLocation()
    const [search, setSearch] = useState("")

    useEffect(() => {
        if (location.pathname.split("/")[1] === "search") {
            setSearch(location.pathname.split("/")[2])
        }
    }, [])

    const enterSearch = (e) => {
        if (e.key === "Enter") return getResult(search)

    }

    return (
        <div className={`bg-white text-black p-1 px-2 grid grid-cols-[1fr,auto] h-fit gap-3 rounded ${className}`}>
            <input onKeyDown={enterSearch} value={search} onChange={(e) => setSearch(e.target.value)} {...props} type="text" className='text-lg outline-none w-full' placeholder='Search for products' name="" id="" />
            <Search onClick={() => getResult(search)} />
        </div >
    )
}

export default SearchInput