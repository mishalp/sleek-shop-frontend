import { CheckCircle, CreditCard, Truck } from "lucide-react";

export default function CheckoutBar({ active }) {
    return (
        <div className='grid grid-cols-[1fr,.75fr,1fr,.75fr,1fr] p-2 place-items-center'>
            <div className={`bg-mysecondary p-2 md:py-3 md:px-6 font-medium rounded-full w-full justify-center text-white flex gap-2`}>
                <Truck />
                <span className="hidden md:flex">Shipping</span>
            </div>
            <div className={`${active === 1 ? 'bg-gray-300 ' : 'bg-mysecondary'} border-mysecondary h-1 w-full`}></div>
            <div className={`${active === 1 ? 'bg-gray-300 text-white' : 'bg-mysecondary text-white'} w-full flex gap-2 justify-center p-2 md:py-3 md:px-6 font-medium rounded-full`}>
                <CreditCard />
                <span className="hidden md:flex">Payment</span>
            </div>
            <div className={`${active < 3 ? 'bg-gray-300 ' : 'bg-mysecondary'} border-mysecondary h-1 w-full`}></div>
            <div className={`${active < 3 ? 'bg-gray-300 text-white' : 'bg-mysecondary text-white'} p-2 md:py-3 md:px-6 font-medium rounded-full w-full flex gap-2 justify-center`}>
                <CheckCircle />
                <span className="hidden md:flex">Success</span>
            </div>
        </div>
    )
}
