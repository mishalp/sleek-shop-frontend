import HomeNav from '../../components/homeNav/HomeNav'
import BestSellingSection from './components/bestSellingSection/BestSellingSection'
import CategorisSection from './components/categoriesSection/CategorisSection'
import FeaturesSection from './components/featuresSection/FeaturesSection'
import HeroSection from './components/heroSection/HeroSection'

function Home() {
    return (
        <div className='w-screen max-w-full bg-primary'>
            <HomeNav />
            <HeroSection />
            <FeaturesSection />
            <CategorisSection />
            <BestSellingSection />
        </div>
    )
}

export default Home