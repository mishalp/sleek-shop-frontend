import Footer from "@/components/footer/Footer"
import Header from "@/components/header/Header"
import FilterBar from "./components/FilterBar"
import FilterProducts from "./components/FilterProducts"
import { useGetAllProductsQuery } from "@/app/services/products"
import { useParams } from "react-router-dom"
import useFilter from "@/hooks/useFilter"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { ShoppingCart, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"


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
            <Sheet key="left">
                <Header />
                <div className="p-2 grid grid-cols-1 md:grid-cols-[auto,1fr] gap-3 pt-24 relative">
                    <SheetContent side="left" className='p-0 max-h-screen w-[16rem] bg-myprimary md:hidden'>
                        <FilterBar
                            setFilters={setFilters}
                            filters={filters}
                            products={filtered}
                            minmax={minmax}
                            sortValue={sortValue}
                            setSortValue={setSortValue}
                            minmaxValues={minmaxValues}
                            className="min-h-screen"
                        />
                    </SheetContent>
                    <SheetTrigger className="md:hidden mr-auto" asChild>
                        <Button className="flex gap-2 p-3 font-medium text-lg text-black rounded-md bg-white">
                            <SlidersHorizontal />
                            Filters
                        </Button>
                    </SheetTrigger>
                    <FilterBar
                        setFilters={setFilters}
                        filters={filters}
                        products={filtered}
                        minmax={minmax}
                        sortValue={sortValue}
                        setSortValue={setSortValue}
                        minmaxValues={minmaxValues}
                        className="max-md:hidden"
                    />
                    <FilterProducts products={filtered} />
                </div>
                <Footer />
            </Sheet>

        </div>
    )
}

export default Search