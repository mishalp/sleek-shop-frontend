import sony from '@/assets/brands/sony.png'
import dell from '@/assets/brands/dell.png'
import lg from '@/assets/brands/lg.png'
import apple from '@/assets/brands/apple.png'
import microsoft from '@/assets/brands/microsoft.png'

const brands = [
    sony,
    dell,
    lg,
    apple,
    microsoft
]

function BrandSection() {
    return (
        <div className="p-6">
            <div className="p-4 flex gap-4 bg-white rounded-md justify-around flex-wrap">
                {brands.map((item, key) => (
                    <img src={item} className='w-auto h-7 md:h-12 lg:h-16 xl:h-20 ' key={key} alt="" />
                ))}
            </div>
        </div>
    )
}

export default BrandSection