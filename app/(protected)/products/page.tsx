import { fetchProducts } from '@/lib/api';
import { ProductCard } from '@/components/product-card';

export default async function Page() {
    const products = await fetchProducts();

    return (
        <div className='container mx-auto px-4 py-8'>
            <div className='mb-10 text-center'>
                <h1 className='text-4xl font-bold text-black mb-2'>
                    <span className='text-[rgb(255,68,16)]'>Our</span> Products
                </h1>
                <p className='text-gray-600 max-w-2xl mx-auto'>
                    Discover high-quality supplements to power your fitness journey
                </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        category={product.category}
                        image={product.image}
                        description={product.description}
                    />
                ))}
            </div>
        </div>
    );
}
