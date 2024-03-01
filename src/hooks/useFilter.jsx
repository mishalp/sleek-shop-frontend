import { useEffect, useState } from "react"

function useFilter(data, isLoading, isError, search) {
    const [sortValue, setSortValue] = useState('az')
    const [filtered, setFiltered] = useState([])
    const [searched, setSearched] = useState([])

    const [minmax, setMinmax] = useState({ min: 0, max: 0 })
    const [minmaxValues, setMinmaxValues] = useState([])

    const [filters, setFilters] = useState({
        minmax: { min: 0, max: 0 },
    })

    useEffect(() => {
        if (!isLoading && !isError) {
            let pr1 = []
            let pr2 = []
            let pr3 = []
            data.products.forEach(item => {
                if (item.name.toUpperCase().includes(search.toUpperCase())) return pr1.push(item)
                if (item.category.toUpperCase().includes(search.toUpperCase())) return pr2.push(item)
                if (item.description.toUpperCase().includes(search.toUpperCase())) return pr3.push(item)
            })
            const products = [...pr1, ...pr2, ...pr3]
            console.log(products);
            setSearched(products)
            setFiltered(sort(sortValue, products))
            setFilters({
                ...filters,
                minmax: minmax
            })
            getMinmax(products)
        }
    }, [isLoading, search])

    useEffect(() => {
        let products = searched.filter(item => item.price >= filters.minmax.min && item.price <= filters.minmax.max)
        setFiltered(sort(sortValue, products))
    }, [filters])

    useEffect(() => {
        setFiltered(sort(sortValue, filtered))
    }, [sortValue])


    function sort(value, products) {
        switch (value) {
            case "az": return products.toSorted((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1)

            case "p": return products.toSorted((a, b) => a.sold_out > b.sold_out ? -1 : 1)

            case "lh": return products.toSorted((a, b) => a.price < b.price ? -1 : 1)

            case "hl": return products.toSorted((a, b) => a.price > b.price ? -1 : 1)

            case "n": return products.toSorted((a, b) => new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime() ? -1 : 1)

        }
    }

    function getMinmax(products) {
        if (products && products[0] && products.length > 0) {
            let min = 0
            let max = products.reduce((max, p) => p.price > max ? p.price : max, products[0].price)

            let diff = max - min
            let step = String(parseInt(diff / 3))
            step = step.split("")
            for (let i = 1; i < step.length; i++) {
                step[i] = '0'
            }
            step = parseInt(step.join(""))
            let temp = []
            for (let i = 0; i < max; i = i + step) {
                temp.push(i)
            }
            temp.push(max)
            setMinmaxValues(temp)
            const value = {
                min: 0,
                max: temp[temp.length - 1]
            }
            setMinmax(value)
            setFilters({
                ...filters,
                minmax: value
            })
        }
    }

    return { sortValue, setSortValue, filtered, minmax, minmaxValues, filters, setFilters }
}

export default useFilter