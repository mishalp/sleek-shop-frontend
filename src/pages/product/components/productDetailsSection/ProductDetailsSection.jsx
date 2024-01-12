import { useParams } from "react-router-dom";
import Details from "../details/Details"
import Display from "../display/Display"
import { useSelector } from "react-redux";
import { useRef, useState } from "react";



function ProductDetailsSection() {

    const [current, setCurrent] = useState(0)
    const { prodId } = useParams()
    const product = useSelector(store => store.products[prodId])
    const canvas = useRef()
    const zoomImg = useRef()

    return (
        <div className="p-3 grid lg:grid-cols-2 pt-24 min-h-screen">
            <Display product={product} current={current} setCurrent={setCurrent} images={product.images} zoomImg={zoomImg} canvas={canvas} />
            <Details canvas={canvas} current={current} zoomImg={zoomImg} product={product} />
        </div>
    )
}

export default ProductDetailsSection