'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Loader } from 'lucide-react';

export default function LoginForm() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();
    const { login, error, isLoading } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login({ username, password });
            router.push('/products');
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    return (
        <div className='min-h-screen bg-white flex items-center justify-center p-4'>
            <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-100'>
                <div className='text-center mb-8'>
                    <h1 className='text-3xl font-bold text-black mb-2'>Welcome Back</h1>
                    <p className='text-gray-600'>Sign in to access your account</p>
                </div>

                {error && <div className='mb-6 p-3 bg-red-50 text-red-700 rounded-lg text-sm'>{error}</div>}

                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div>
                        <label htmlFor='username' className='block text-sm font-medium text-gray-700 mb-1'>
                            Username
                        </label>
                        <input
                            id='username'
                            type='text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg '
                            required
                            placeholder='Enter your username'
                        />
                    </div>

                    <div>
                        <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-1'>
                            Password
                        </label>
                        <input
                            id='password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full px-4 py-2 border border-gray-300 rounded-lg '
                            required
                            placeholder='Enter your password'
                        />
                    </div>

                    <button
                        type='submit'
                        disabled={isLoading}
                        className={`w-full py-3 px-4 rounded-lg font-medium text-white bg-[rgb(255,68,16)] hover:bg-[rgb(220,58,8)] transition-colors ${
                            isLoading ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                    >
                        {isLoading ? (
                            <span className='flex items-center justify-center'>
                                <Loader className='animate-spin -ml-1 mr-2 h-4 w-4 text-white' />
                                Signing in...
                            </span>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                <div className='mt-6 text-center text-sm'>
                    <p className='text-gray-600'>Demo credentials</p>
                    <div className='mt-2 bg-gray-50 p-3 rounded-lg'>
                        <p className='text-gray-800 font-mono text-sm'>Username: mor_2314</p>
                        <p className='text-gray-800 font-mono text-sm'>Password: 83r5^_</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
