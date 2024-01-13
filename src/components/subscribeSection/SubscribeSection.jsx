import React from 'react'

function SubscribeSection() {
    return (
        <div className='p-8 md:p-12 sm:px-8 lg:px-16 bg-mytertiory gap-y-5 grid grid-cols-1 md:grid-cols-2 '>
            <div className="flex justify-center md:justify-start">
                <p className='text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-medium md:max-w-96 leading-8 md:leading-[3rem]'>
                    <span className='text-[#88A0BF]'>Subscribe </span>
                    us for get news events and offers
                </p>
            </div>
            <div className="grid place-items-center">
                <div className="flex flex-col sm:flex-row gap-4">
                    <input type="text" className='p-2 rounded' placeholder='Enter your email...' name="" id="" />
                    <button className='p-4 py-2 rounded bg-[#88A0BF]'>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default SubscribeSection