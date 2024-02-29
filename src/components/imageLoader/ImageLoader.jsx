import React, { useRef, useState } from 'react'
import { Skeleton } from '../ui/skeleton'

function ImageLoader({ src, className }) {

    const [image, setImage] = useState(false)

    const handleImage = () => {
        setImage(true)
    }

    return (
        <div className='flex relative'>
            <img src={src} className={`${className} ${image ? "" : 'opacity-0'}`} onLoad={handleImage} />
            {!image && <div className="min-w-[5rem] min-h-[5rem] aspect-square absolute inset-0 z-[1]">
                <Skeleton className="h-full w-full" />
            </div>}
        </div>
    )
}

export default ImageLoader