'use client';

import { useAuth } from '@/context/auth-context';
import Link from 'next/link';
import { LogOut } from 'lucide-react';

export function Navbar() {
    const { logout } = useAuth();

    return (
        <header className='bg-white border-b border-gray-200 shadow-sm'>
            <div className='container mx-auto px-4'>
                <div className='flex justify-between items-center h-16'>
                    <Link href='/' className='flex items-center'>
                        <span className='text-2xl font-bold text-black'>
                            <span className='text-[rgb(255,68,16)]'>Gym</span>Beam
                        </span>
                    </Link>

                    <button
                        onClick={logout}
                        className='flex items-center justify-center px-4 py-2 rounded-md bg-[rgb(255,68,16)] text-white hover:bg-[rgb(220,58,8)] transition-colors'
                    >
                        <LogOut className='h-5 w-5 mr-2' />
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
}
