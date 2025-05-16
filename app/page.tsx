'use client';

import Link from 'next/link';
import { useAuth } from '@/context/auth-context';

export default function HomePage() {
    const { isAuthenticated } = useAuth();

    return (
        <div className='min-h-screen flex flex-col items-center justify-center p-4 bg-white'>
            <div className='max-w-md w-full text-center'>
                <h1 className='text-4xl font-bold mb-6'>
                    <span className='text-[rgb(255,68,16)]'>Gym</span>Beam
                </h1>

                <p className='text-lg mb-8 text-gray-700'>Your premium destination for sports nutrition</p>

                <div className='space-y-4'>
                    {!isAuthenticated ? (
                        <>
                            <Link
                                href='/login'
                                className='block w-full bg-[rgb(255,68,16)] text-white py-3 px-4 rounded-lg font-medium hover:bg-[rgb(220,58,8)] transition'
                            >
                                Login
                            </Link>
                        </>
                    ) : (
                        <Link
                            href='/products'
                            className='block w-full bg-[rgb(255,68,16)] text-white py-3 px-4 rounded-lg font-medium hover:bg-[rgb(220,58,8)] transition'
                        >
                            View Products
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
