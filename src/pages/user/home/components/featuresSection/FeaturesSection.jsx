import box from '@/assets/icons/box.svg'
import repeat from '@/assets/icons/repeat.svg'
import trophy from '@/assets/icons/trophy.svg'
import shield from '@/assets/icons/shield.svg'

const features = [
    {
        title: "Free Shipping",
        subTitle: "From all orders over ₹400",
        icon: box
    },
    {
        title: "Daily Surprise Offers",
        subTitle: "Save up to 25% off",
        icon: repeat
    },
    {
        title: "Affortable Prices",
        subTitle: "Get Factory direct price",
        icon: trophy
    },
    {
        title: "Secure Pauments",
        subTitle: "100% protected payments",
        icon: shield
    },
]

function FeaturesSection() {
    return (
        <div className="p-6 max-lg:px-4 font-popins text-mysecondary">
            <div className="grid grid-cols-[auto,auto] gap-y-4 lg:grid-cols-[auto,auto,auto,auto] rounded-md shadow-md items-center justify-between sm:justify-around lg:justify-between bg-white p-4 lg:py-8 lg:px-8">
                {features.map(item => (
                    <div className="flex flex-col xl:flex-row gap-4 w-fit items-center" key={item.title}>
                        <img src={item.icon} className='w-7 max-lg:max-w-12' alt="" />
                        <div className="flex flex-col items-center text-center">
                            <h3 className='text-[.8rem] md:text-base lg:text-lg font-semibold' >{item.title}</h3>
                            <p className='font-normal text-[.7rem] md:text-base'>{item.subTitle}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FeaturesSection