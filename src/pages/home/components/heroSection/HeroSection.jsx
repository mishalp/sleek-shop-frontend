import Button from "../../../../components/button/Button"
import headset from '../../../../assets/images/headset.png'

function HeroSection() {
    return (
        <div className="grid grid-cols-7 w-full font-popins">
            <div className="h-screen col-span-4 grid pl-16 items-center justify-start bg-primary pt-20">
                <div className="grid text-tertiory justify-items-start gap-4">
                    <p className="text-2xl font-medium">Up to 50% OFF on</p>
                    <h1 className="text-6xl font-bold">HEADPHONES</h1>
                    <Button title="Explore" primary />
                    <p className="max-w-lg">
                        In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying
                    </p>
                </div>
            </div>
            <div className="h-screen col-span-3 bg-secondary grid place-items-center relative">
                <div className="flex flex-col gap-4 items-center z-[2]">
                    <h3 className="text-white text-[2.5rem] drop-shadow-md font-bold">Sony Headeset</h3>
                    <h5 className="text-white text-3xl font-bold">₹12,990  <span className="line-through">₹24,990</span></h5>
                    <Button title="Add to Cart" />
                </div>
                <img src={headset} className="absolute top-28 z-[1] -left-56" alt="product image" />
            </div>
        </div>
    )
}

export default HeroSection