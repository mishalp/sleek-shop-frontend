import Header from '@/components/header/Header'
import BestSellingSection from './components/bestSellingSection/BestSellingSection'
import BrandSection from './components/brandSection/BrandSection'
import CategoriesSection from './components/categoriesSection/CategoriesSection'
import FeaturesSection from './components/featuresSection/FeaturesSection'
import HeroSection from './components/heroSection/HeroSection'
import Footer from '@/components/footer/Footer'
import SubscribeSection from '@/components/subscribeSection/SubscribeSection'

function Home() {
    return (
        <div className='w-screen max-w-full bg-myprimary'>
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