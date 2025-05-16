import { Navbar } from '@/components/navbar';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className='min-h-screen bg-gray-100 flex flex-col'>
            <Navbar />
            {children}
        </div>
    );
}
