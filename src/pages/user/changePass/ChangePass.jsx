import Header from '@/components/header/Header'
import SideBar from '@/components/sideBar/SideBar'
import { LockKeyhole } from 'lucide-react'
import PassForm from './PassForm'

export default function ChangePass() {
    return (
        <div className='w-screen max-w-full bg-myprimary'>
            <Header />
            <div className="grid grid-cols-[auto,1fr] w-full mt-20">
                <SideBar role='user' active={3} />
                <div className="p-4">
                    <h2 className="text-2xl font-bold font-popins text-center inline-flex ml-8 gap-2"><LockKeyhole size={32} strokeWidth={1.5} />Change Password</h2>
                    <PassForm />
                </div>
            </div>
        </div>
    )
}
