
export default function CheckoutBar({ active }) {
    return (
        <div className='grid grid-cols-[1fr,.75fr,1fr,.75fr,1fr] p-2 place-items-center'>
            <div className={`bg-mysecondary py-3 px-6 font-medium rounded-3xl text-white`}>Shipping</div>
            <div className={`${active === 1 ? 'bg-gray-300 ' : 'bg-mysecondary'} border-mysecondary h-1 w-full`}></div>
            <div className={`${active === 1 ? 'bg-gray-300 text-white' : 'bg-mysecondary text-white'} py-3 px-6 font-medium rounded-3xl`}>Payment</div>
            <div className={`${active < 3 ? 'bg-gray-300 ' : 'bg-mysecondary'} border-mysecondary h-1 w-full`}></div>
            <div className={`${active < 3 ? 'bg-gray-300 text-white' : 'bg-mysecondary text-white'} py-3 px-6 font-medium rounded-3xl`}>Success</div>
        </div>
    )
}
