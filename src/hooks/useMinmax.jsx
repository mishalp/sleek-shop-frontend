import { useState } from 'react'

function useMinmax() {
    const [minmaxValues, setMinmaxValues] = useState([])
    const [minmax, setMinmax] = useState({ min: 0, max: 0 })
    const [loading, setLoading] = useState(true)

    const getMinmax = (products) => {
        setLoading(true)
        if (products && products[0] && products.length > 1) {
            let min = products.reduce((min, p) => p.price < min ? p.price : min, products[0].price)
            let max = products.reduce((max, p) => p.price > max ? p.price : max, products[0].price)
            let diff = max - min
            let step = String(parseInt(diff / 3))
            step = step.split("")
            for (let i = 1; i < step.length; i++) {
                step[i] = '0'
            }
            step = parseInt(step.join(""))
            let temp = []
            console.log(step);
            console.log(min, max);
            for (let i = 0; i < max; i = i + step) {
                temp.push(i)
            }
            temp.push(max)
            setMinmaxValues(temp)
            const value = {
                min: 0,
                max: temp[temp.length - 1]
            }
            console.log(value);
            setMinmax(value)
        }
        setLoading(false)
    }

    return [getMinmax, { minmaxValues, minmax, setMinmax, loading }]
}

export default useMinmax