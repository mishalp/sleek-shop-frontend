import { Link } from "react-router-dom";
import { shopMenu } from "./shopMenu";
import { userMenu } from "./userMenu";


function SideBar({ active, role }) {
    let menu = role === 'seller' ? shopMenu : role === 'user' ? userMenu : ''
    return (
        <div className="flex max-md:hidden flex-col bg-white min-w-16 lg:min-w-64 h-[calc(100vh-5rem)] sticky top-[5rem] left-0 overflow-auto">
            <div className="bg-myprimary">
                {menu.map((item, index) => (
                    <Link key={index} to={item.link}
                        className={`${active === index ? "bg-myprimary z-[1]" : active - 1 === index ? "rounded-br-3xl bg-white shadow z-[2]" : active + 1 === index ? "rounded-tr-3xl bg-white shadow z-[2]" : "bg-white shadow z-[2]"} p-4 flex relative ${index === menu.length - 1 ? 'shadow-none' : ''} items-center gap-2`}
                    >
                        {item.icon}
                        <p className={`text-lg hidden md:flex`}>{item.title}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SideBar
