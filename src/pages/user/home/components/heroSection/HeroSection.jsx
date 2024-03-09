import Button from "@/components/button/MyButton"
import headset from '@/assets/images/headset.png'

function HeroSection() {
    return (
        <div className="grid grid-cols-1 sm:max-lg:grid-rows-2 bg-[#E0E0E0] lg:grid-cols-7 lg:gap-8 content-around w-full h-screen font-popins relative">
            <div className="lg:h-screen max-lg:px-4 lg:col-span-4 grid lg:pl-16 items-center pt-20 justify-start">
                <div className="grid text-mytertiory justify-items-start gap-2 lg:gap-4">
                    <p className="text-lg lg:text-2xl font-medium">Up to 50% OFF on</p>
                    <h1 className="text-4xl lg:text-6xl font-bold">HEADPHONES</h1>
                    <Button className="hidden lg:flex" title="Explore" primary />
                    <p className="max-w-lg text-sm md:text-base">
                        In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying
                    </p>
                </div>
            </div>
            <div className="lg:h-screen lg:max-xl:pt-20 justify-center xl:grid flex flex-col-reverse lg:flex-col-reverse lg:justify-center sm:flex-row-reverse sm:justify-around lg:col-span-3 sm:max-xl:py-8 sm:bg-mysecondary place-items-center relative">
                <div className="flex flex-col gap-2 sm:gap-2 lg:gap-4 items-center z-[2]">
                    <h3 className="text-mysecondary sm:text-white text-3xl md:text-4xl lg:text-[2.5rem] drop-shadow-md font-bold">Sony Headeset</h3>
                    <h5 className="text-mysecondary sm:text-white text-2xl lg:text-3xl font-bold">₹12,990  <span className="line-through">₹24,990</span></h5>
                    <Button title="Add to Cart" className={`max-sm:!bg-mysecondary max-sm:!text-white`} />
                </div>
                <img src={headset} className="xl:absolute w-52 lg:max-xl xl:w-auto top-52 z-[1] lg:-left-44" alt="product image" />
            </div>
        </div>
    )
}

export default HeroSection