import { fetchProduct } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await fetchProduct(id);

    return (
        <div className='bg-white min-h-screen'>
            <div className='container mx-auto px-4 py-8'>
                <div className='mb-6'>
                    <Link
                        href='/products'
                        className='inline-flex items-center text-[rgb(255,68,16)] hover:text-[rgb(220,58,8)] transition-colors'
                    >
                        <ChevronLeft className='h-5 w-5 mr-1' />
                        Back to Products
                    </Link>
                </div>

                <div className='max-w-6xl mx-auto'>
                    <div className='flex flex-col md:flex-row gap-8'>
                        <div className='md:w-1/2'>
                            <div className='bg-gray-50 rounded-lg p-8 flex items-center justify-center h-full'>
                                <div className='relative w-full h-96'>
                                    <Image
                                        src={product.image}
                                        alt={product.title}
                                        fill
                                        className='object-contain'
                                        priority
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='md:w-1/2'>
                            <div className='space-y-6'>
                                <span className='inline-block px-3 py-1 rounded-full text-xs font-semibold text-[rgb(255,68,16)] bg-orange-50'>
                                    {product.category}
                                </span>

                                <h1 className='text-3xl font-bold text-gray-900'>{product.title}</h1>

                                <p className='text-3xl font-bold text-[rgb(255,68,16)]'>${product.price.toFixed(2)}</p>

                                <div className='prose max-w-none text-gray-700'>
                                    <p>{product.description}</p>
                                </div>

                                <div className='pt-4 border-t border-gray-200'>
                                    <h3 className='text-sm font-medium text-gray-900'>Product Details</h3>
                                    <div className='mt-2 space-y-3'>
                                        <div className='flex items-center text-sm text-gray-600'>
                                            <span className='font-medium mr-2'>Category:</span>
                                            <span className='capitalize'>{product.category}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
