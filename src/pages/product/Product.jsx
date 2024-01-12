import Header from "../../components/header/Header";
import ProductDetailsSection from "./components/productDetailsSection/ProductDetailsSection";

function Product() {
    return (
        <div className='w-screen max-w-full bg-primary relative'>
            <div className="flex flex-col">
                <Header />
                <ProductDetailsSection />
            </div>
        </div>
    )
}

export default Product