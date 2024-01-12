import { useSelector } from 'react-redux'
import Footer from '../../components/footer/Footer'
import BestSellingSection from './components/bestSellingSection/BestSellingSection'
import BrandSection from './components/brandSection/BrandSection'
import CategoriesSection from './components/categoriesSection/CategoriesSection'
import FeaturesSection from './components/featuresSection/FeaturesSection'
import HeroSection from './components/heroSection/HeroSection'
import SubscribeSection from '../../components/subscribeSection/SubscribeSection'
import Header from '../../components/header/Header'

function Home() {

    const products = useSelector(store => store.products)
    console.log(products);

    return (
        <div className='w-screen max-w-full bg-primary'>
            <Header />
            <HeroSection />
            <FeaturesSection />
            <CategoriesSection />
            <BestSellingSection />
            <BrandSection />
            <SubscribeSection />
            <Footer />
        </div>
    )
}

export default Home