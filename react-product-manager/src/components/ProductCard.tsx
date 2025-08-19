import type { Product } from '../types/types';
import { Button } from './Button';

type ProductCardProps = {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
};

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  const { id, name, price, category, stock } = product;

  const stockText =
    stock === 0
      ? '0 (Out of Stock)'
      : stock < 10
        ? `${stock} (Low Stock)`
        : stock.toString();

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
      <h3 className="text-lg font-bold text-slate-800 mb-4">{name}</h3>

      <div className="flex flex-col gap-2 mb-4 text-base">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-slate-500">Price:</span>
          <span className="font-bold text-slate-800 text-lg">
            ${price.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-slate-500">Category:</span>
          <span className="font-semibold bg-slate-100 text-slate-600 text-xs font-medium px-2.5 py-1 rounded-full">
            {category}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-slate-500">Stock:</span>
          <span className="font-bold text-slate-800">{stockText}</span>
        </div>
      </div>

      <div className="mt-auto flex gap-2">
        <Button
          variant="edit"
          onClick={() => onEdit(product)}
          className="flex-1"
        >
          Edit
        </Button>
        <Button
          variant="delete"
          onClick={() => onDelete(id)}
          className="flex-1"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
