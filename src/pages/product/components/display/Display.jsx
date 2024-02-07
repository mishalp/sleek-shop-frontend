import { useEffect, useRef, useState } from "react"
import Button from "../../../../components/button/MyButton"

function Display({ images, product, canvas, zoomImg, current, setCurrent }) {
    const lens = useRef()
    const image = useRef()
    const display = useRef()

    const [states, setStats] = useState({
        clientX: "",
        clientY: "",
        layerX: "",
        layerY: "",
        offsetX: "",
        offsetY: "",
        x: "",
        y: ""
    })

    useEffect(() => {
        const trackLense = (e) => {
            lens.current.style.display = "flex";
            canvas.current.style.display = "flex";
            let width = image.current.offsetWidth
            let height = image.current.offsetHeight
            console.log(e);
            let offset = image.current.getBoundingClientRect()
            console.log(offset);
            setStats({
                clientX: e.clientX,
                clientY: e.clientY,
                layerX: e.layerX,
                layerY: e.layerY,
                offsetX: e.offsetX,
                offsetY: e.offsetY,
                offsetWidth: e.target.offsetWidth,
                offsetHeight: e.target.offsetHeight,
                imgPosX: (e.layerX) / width * 100,
                imgPosY: e.layerY / height * 100,
                x: e.clientX - offset.left,
                y: e.clientY - offset.top

            })
            console.log(image.current.offsetWidth);
            console.log(image.current.offsetHeight);

            lens.current.style.transform = `translate(${e.clientX - offset.left - (lens.current.offsetWidth / 2)}px, ${e.clientY - offset.top - (lens.current.offsetHeight / 2)}px)`
            // lens.current.style.left = `${e.clientX}px`
            // lens.current.style.top = `${e.clientY}px`
            let posX = (e.clientX - offset.left) / width * 100
            let posY = (e.clientY - offset.top) / height * 100
            console.log(posX, posY);
            zoomImg.current.style.transform = `translate(-${posX * 2.2 - 17}%, -${posY * 2.2 - 17}%) scale(3)`
            // zoomImg.current.style.objectPosition = `${posX}% ${posY}%`
            // canvas.current.style.backgroundPosition = `-${e.layerX * 2}px -${e.layerY * 2}px`


        }
        if (image && image.current && lens && lens.current) {
            let width = image.current.offsetWidth
            let height = image.current.offsetHeight
            lens.current.style.width = '35%'
            image.current.addEventListener("mousemove", trackLense)
            // canvas.current.style.width = width + 'px'

            // canvas.current.style.height = display.current.offsetHeight + 'px'
            // canvas.current.style.backgroundImage = `url('${images[current]}')`
            image.current.addEventListener("mouseleave", () => { lens.current.style.display = "none"; canvas.current.style.display = "none" })
        }
        return () => {
            if (image.current) image.current.removeEventListener("mousemove", trackLense)
        }
    }, [image, lens])

    return (
        <div ref={display} className="p-3 flex gap-3 w-full sticky top-[100px] h-fit">
            <div className="flex flex-col gap-4 ">
                {images?.map((img, key) => (
                    <img src={img.url} onClick={() => setCurrent(key)} key={key} className={`max-w-14 cursor-pointer border-2 ${current === key ? 'border-mytertiory' : 'border-slate-300'} aspect-square object-contain rounded p-2 h-auto`} alt="" />
                ))}
            </div>
            <div className="flex flex-col gap-3 items-center w-full">
                <div className="p-3 flex w-full justify-center items-center">
                    <div ref={image} className="relative overflow-hidden cursor-crosshair">
                        <img src={images?.[current].url} className="max-h-[60vh] w-auto" alt="" />
                        <div ref={lens} className="bg-[hsla(0,0%,100%,.3)] border-[#ccc] hidden absolute top-0 left-0 aspect-square"></div>
                    </div>
                </div>
                <div className="flex gap-4 justify-center">
                    <Button title="Add to Cart" className='min-w-12 !rounded' />
                    <Button title="Buy Now" primary className='min-w-44 !rounded' />
                </div>
            </div>
        </div>
    )
}

export default Display