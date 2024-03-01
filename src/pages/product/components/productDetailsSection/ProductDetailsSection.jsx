import { useParams } from "react-router-dom";
import Details from "../details/Details"
import Display from "../display/Display"
import { useRef, useState } from "react";
import useGetProduct from "@/hooks/useGetProduct";



function ProductDetailsSection() {

    const [current, setCurrent] = useState(0)
    const { prodId } = useParams()
    const product = useGetProduct(prodId)

    const canvas = useRef()
    const zoomImg = useRef()
    if (!product) return <p>loading</p>

    return (
        <div className="p-3 grid lg:grid-cols-2 pt-24 min-h-screen">
            <Display product={product} current={current} setCurrent={setCurrent} images={product.images} zoomImg={zoomImg} canvas={canvas} />
            <Details canvas={canvas} current={current} zoomImg={zoomImg} product={product} />
        </div>
    )
}

export default ProductDetailsSection