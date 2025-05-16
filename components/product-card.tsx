import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
    readonly id: number;
    readonly title: string;
    readonly price: number;
    readonly description: string;
    readonly category: string;
    readonly image: string;
}

export function ProductCard(props: ProductCardProps) {
    return (
        <Link href={`/products/${props.id}`} className='group'>
            <div className='h-full flex flex-col bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden'>
                <div className='relative h-56 bg-gray-50 flex items-center justify-center p-4'>
                    <Image
                        src={props.image}
                        alt={props.title}
                        width={200}
                        height={200}
                        className='object-contain h-full w-full transition-transform duration-300 group-hover:scale-110'
                    />
                </div>

                <div className='flex-1 p-5 flex flex-col'>
                    <span className='text-xs font-medium text-[rgb(255,68,16)] uppercase tracking-wider mb-1'>
                        {props.category}
                    </span>

                    <h3 className='text-lg font-bold text-gray-900 mb-2 line-clamp-2'>{props.title}</h3>

                    <p className='text-sm text-gray-600 mb-4 line-clamp-2 flex-1'>{props.description}</p>

                    <div className='mt-auto'>
                        <p className='text-xl font-bold text-[rgb(255,68,16)]'>${props.price.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
