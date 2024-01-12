
const categoris = [
    {
        title: "Computers and Laptops",
        img: "https://img.freepik.com/free-psd/realistic-computer-design_1310-689.jpg?w=1060&t=st=1704367660~exp=1704368260~hmac=c78bed734fcf4373c4f2e01223287c252dd3bfb85c4809f7d2abdfe1913bea4e"
    },
    {
        title: "Cosmetics and body care",
        img: "https://img.freepik.com/free-photo/some-cosmetic-parts-table_144627-9476.jpg?w=1060&t=st=1704367833~exp=1704368433~hmac=f79e20d44c026c873aac729939257175c416c455cf238ed3270beec7cb221238"
    },
    {
        title: "Accesories",
        img: "https://img.freepik.com/free-photo/still-life-casual-man-modern-male-accessories-white_155003-1724.jpg?w=1060&t=st=1704367887~exp=1704368487~hmac=8bd9aa8f66b4ec5dae6fc456df40a05f2441b94abd20678634608907ce69ba5d"
    },
    {
        title: "Cloths",
        img: "https://img.freepik.com/free-photo/green-front-sweater_125540-736.jpg?w=1060&t=st=1704368036~exp=1704368636~hmac=0f4e2a724e800cb58de1993effa5a2420d1632e589b8950244a9ce5848e3b18c"
    },
    {
        title: "Shoes",
        img: "https://img.freepik.com/free-photo/ice-coffee-with-whipped-cream_144627-3801.jpg?w=740&t=st=1704368116~exp=1704368716~hmac=3f227486408076e109801b39298cbe44ae9bbb985695bca04069dc12fd8f2670"
    },
    {
        title: "Gifts",
        img: "https://img.freepik.com/free-photo/white-gift-boxes-with-red-ribbon_1156-685.jpg?w=996&t=st=1704368216~exp=1704368816~hmac=10564db21ff32e31261bacba12bade0617dec19efb7c07e6455f30e17eec0527"
    },
    {
        title: "Pet care",
        img: "https://img.freepik.com/free-photo/brown-dog-with-blue-stripped-pet-clothing-isolated-white-background_23-2147840949.jpg?t=st=1704368387~exp=1704368987~hmac=56079c1410f2de0e54746dd2c1e7b0995f31d7d07a749bf3b9b20962497cec09"
    },
    {
        title: "Mobile and Tablets",
        img: "https://img.freepik.com/free-vector/tablet-mobile-phone-design_1156-98.jpg?w=740&t=st=1704368484~exp=1704369084~hmac=191ac25a061f490ba944d1b024676179c59b5e48cbb9fbd28630825d025e6cf1"
    },
    {
        title: "Music and Gaming",
        img: "https://img.freepik.com/free-photo/activity-control-cable-relaxation-station_1172-483.jpg?w=1060&t=st=1704368650~exp=1704369250~hmac=cc6e95f2d85dfe648680543716f066761e8eef4c7885b10db48c4c84ba110a14"
    },
    {
        title: "Others",
        img: "https://img.freepik.com/free-vector/skincare-cosmetics-products-line-packaging_1441-3136.jpg?w=740&t=st=1704368711~exp=1704369311~hmac=69273dc870d3a66153325a2904d5dc003f0d20b11256a2fb159c8530b9d8b993"
    },
]

function CategoriesSection() {
    return (
        <div className="xl:p-6 font-popins overflow-auto disableScrollBar">
            <div className="p-4 m-6 xl:m-0 bg-white flex w-fit xl:w-auto xl:grid xl:grid-cols-5 justify-items-center gap-4 rounded-md">
                {categoris.map((item, key) => (
                    <a key={key} href="#" className="flex-col xl:flex-row min-w-36 flex gap-2 items-center group">
                        <img src={item.img} className="w-24 z-0 duration-300 group-hover:scale-[1.2] aspect-square object-contain rounded-lg" alt="" />
                        <p className="text-lg z-[2]">{item.title}</p>
                    </a>
                ))}
            </div>
        </div>
    )
}

export default CategoriesSection