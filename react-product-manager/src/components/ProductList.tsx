import type { Product } from '../types/types';
import { ProductCard } from './ProductCard';

type ProductListProps ={
    products: Product[];
}

export function ProductList({ products }: ProductListProps) {

    const handleEdit = (productId: number) => {
        console.log(`Editing product with ID: ${productId}`);
    };

    const handleDelete = (productId: number) => {
        console.log(`Deleting product with ID: ${productId}`);
    };

    return (
        <section>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800">
                    Products <span className="text-slate-500 font-medium">({products.length})</span>
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </section>
    );
}