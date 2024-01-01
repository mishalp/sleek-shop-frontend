import HomeNav from '../../components/homeNav/HomeNav'
import HeroSection from './components/heroSection/HeroSection'

function Home() {
    return (
        <div className='w-screen max-w-full'>
            <HomeNav />
            <HeroSection />
        </div>
    )
}

export default Home