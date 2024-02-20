import Footer from "@/components/footer/Footer"
import Header from "@/components/header/Header"
import FilterBar from "./components/FilterBar"
import FilterProducts from "./components/FilterProducts"
import { useEffect, useState } from "react"
import { useGetAllProductsQuery } from "@/app/services/products"
import { useParams } from "react-router-dom"

function Search() {
    const { data, isLoading, isError } = useGetAllProductsQuery()
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const { search } = useParams()

    useEffect(() => {
        if (!isLoading && !isError) {
            const items = data.products.filter(item => {
                return (
                    item.name.toUpperCase().includes(search.toUpperCase()) ||
                    item.description.toUpperCase().includes(search.toUpperCase()) ||
                    item.category.toUpperCase().includes(search.toUpperCase())
                )
            })
            setProducts(items)
            setFilteredProducts(items)
        }
    }, [isLoading, search])

    if (isLoading) return <p>Loading</p>
    return (
        <div className='w-screen max-w-full bg-myprimary'>
            <Header />
            <div className="p-2 grid grid-cols-[auto,1fr] gap-3 pt-24 relative">
                {!isLoading && !isError &&
                    <FilterBar
                        setFilteredProducts={setFilteredProducts}
                        filteredProducts={filteredProducts}
                        products={products}
                        setProducts={setProducts}
                    />}
                <FilterProducts products={filteredProducts} />
            </div>
            <Footer />
        </div>
    )
}

export default Search