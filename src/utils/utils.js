export const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
    }).format(price)
}

export function sortProducts(value, products) {
    switch (value) {
        case "az": return products.toSorted((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1)

        case "p": return products.toSorted((a, b) => a.sold_out > b.sold_out ? -1 : 1)

        case "lh": return products.toSorted((a, b) => a.price < b.price ? -1 : 1)

        case "hl": return products.toSorted((a, b) => a.price > b.price ? -1 : 1)

        case "n": return products.toSorted((a, b) => new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime() ? -1 : 1)

    }
}

export function getMinmax(products) {
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
    for (let i = 0; i < max; i = i + step) {
        temp.push(i)
    }
    temp.push(max)
    const value = {
        min: 0,
        max: temp[temp.length - 1]
    }

    return [temp, value]
}