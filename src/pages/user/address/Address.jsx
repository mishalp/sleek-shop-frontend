import Header from '@/components/header/Header'
import SideBar from '@/components/sideBar/SideBar'
import { NotebookTabs } from 'lucide-react'
import AddressList from './AddressList'

export default function Address() {
    return (
        <div className='w-screen max-w-full bg-myprimary'>
            <Header />
            <div className="grid grid-cols-[auto,1fr] w-full mt-20">
                <SideBar role='user' active={3} />
                <div className="p-4">
                    <h2 className="text-2xl font-bold font-popins text-center inline-flex ml-8 gap-2"><NotebookTabs size={32} strokeWidth={1.5} />Address</h2>
                    <AddressList />
                </div>
            </div>
        </div>
    )
}
