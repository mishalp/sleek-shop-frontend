import Header from '@/components/header/Header'
import SideBar from '@/components/sideBar/SideBar'
import Page from './Page'
import { userMenu } from '@/components/sideBar/userMenu'
import UserMenuSelector from '@/components/userMenu/UserMenuSelector'

export default function Settings() {
    return (
        <div className='w-screen max-w-full min-h-[calc(100vh-5rem)] bg-myprimary'>
            <Header />
            <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] w-full mt-20">
                <SideBar role='user' active={4} />
                <div className="p-4 flex flex-col gap-2">
                    <UserMenuSelector value={userMenu[4]} />
                    <Page />
                </div>
            </div>
        </div>
    )
}
