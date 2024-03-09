import Header from '@/components/header/Header'
import SideBar from '@/components/sideBar/SideBar'
import { UserRound } from 'lucide-react'
import ProfileForm from './ProfileForm'

export default function Profile() {
    return (
        <div className='w-screen max-w-full bg-myprimary'>
            <Header />
            <div className="grid grid-cols-[auto,1fr] w-full mt-20">
                <SideBar role='user' active={0} />
                <div className="p-4">
                    <h2 className="text-2xl font-bold font-popins text-center inline-flex ml-8 gap-2"><UserRound size={32} strokeWidth={1.5} />Profile</h2>
                    <ProfileForm />
                </div>
            </div>
        </div>
    )
}
