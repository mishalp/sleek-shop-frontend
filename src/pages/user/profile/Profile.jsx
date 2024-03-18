import Header from '@/components/header/Header'
import SideBar from '@/components/sideBar/SideBar'
import { UserRound } from 'lucide-react'
import ProfileForm from './ProfileForm'
import { userMenu } from '@/components/sideBar/userMenu'
import { Link } from 'react-router-dom'
import UserMenuSelector from '@/components/userMenu/UserMenuSelector'

export default function Profile() {
    return (
        <div className='w-screen max-w-full bg-myprimary'>
            <Header />
            <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] w-full mt-20">
                <SideBar role='user' active={0} />
                <div className="p-4 flex flex-col gap-2">
                    <UserMenuSelector value={userMenu[0]} />
                    <ProfileForm />
                </div>
            </div>
        </div>
    )
}
