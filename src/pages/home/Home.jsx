import HomeNav from '../../components/homeNav/HomeNav'
import BestSellingSection from './components/bestSellingSection/BestSellingSection'
import BrandSection from './components/brandSection/BrandSection'
import CategoriesSection from './components/categoriesSection/CategoriesSection'
import FeaturesSection from './components/featuresSection/FeaturesSection'
import HeroSection from './components/heroSection/HeroSection'
import SubscribeSection from './components/subscribeSection/SubscribeSection'

function Home() {
    return (
        <div className='w-screen max-w-full bg-primary'>
            <HomeNav />
            <HeroSection />
            <FeaturesSection />
            <CategoriesSection />
            <BestSellingSection />
            <BrandSection />
            <SubscribeSection />
        </div>
    )
}

export default Home