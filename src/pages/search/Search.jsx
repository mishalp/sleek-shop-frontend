import Footer from "@/components/footer/Footer"
import Header from "@/components/header/Header"
import FilterBar from "./components/FilterBar"
import FilterProducts from "./components/FilterProducts"
import { useGetAllProductsQuery } from "@/app/services/products"
import { useParams } from "react-router-dom"
import useFilter from "@/hooks/useFilter"

function Search() {
    const { data, isLoading, isError } = useGetAllProductsQuery()
    const { search } = useParams()
    const {
        sortValue,
        setSortValue,
        filtered,
        minmax,
        minmaxValues,
        setFilters,
        filters
    } = useFilter(data, isLoading, isError, search)

    return (
        <div className='w-screen max-w-full bg-myprimary'>
            <Header />
            <div className="p-2 grid grid-cols-[auto,1fr] gap-3 pt-24 relative">
                <FilterBar
                    setFilters={setFilters}
                    filters={filters}
                    products={filtered}
                    minmax={minmax}
                    sortValue={sortValue}
                    setSortValue={setSortValue}
                    minmaxValues={minmaxValues}
                />
                <FilterProducts products={filtered} />
            </div>
            <Footer />
        </div>
    )
}

export default Search