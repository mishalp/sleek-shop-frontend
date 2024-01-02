import HomeNav from '../../components/homeNav/HomeNav'
import FeaturesSection from './components/featuresSection/FeaturesSection'
import HeroSection from './components/heroSection/HeroSection'

function Home() {
    return (
        <div className='w-screen max-w-full bg-primary'>
            <HomeNav />
            <HeroSection />
            <FeaturesSection />
        </div>
    )
}

export default Home