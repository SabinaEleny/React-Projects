import type { Product } from '../types/types';
import { ProductCard } from './ProductCard';
import { EmptyState } from './EmptyState.tsx';

type ProductListProps = {
  products: Product[];
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (id: number) => void;
};

export function ProductList({
  products,
  onEditProduct,
  onDeleteProduct,
}: ProductListProps) {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Products{' '}
          <span className="text-slate-500 font-medium">
            ({products.length})
          </span>
        </h2>
      </div>

      {products.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={onEditProduct}
              onDelete={onDeleteProduct}
            />
          ))}
        </div>
      )}
    </section>
  );
}
