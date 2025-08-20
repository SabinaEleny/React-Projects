import { Button } from './Button';

type ControlsProps = {
  onAddClick: () => void;
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedCategory: string;
  onCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  categories: string[];
  sortBy: string;
  onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onClearFilters: () => void;
};

export function Controls({
                           onAddClick,
                           searchTerm,
                           onSearchChange,
                           selectedCategory,
                           onCategoryChange,
                           categories,
                           sortBy,
                           onSortChange,
                           onClearFilters,
                         }: ControlsProps) {
  return (
    <section className="mb-10 flex flex-col items-start gap-6">
      <Button variant="primary" onClick={onAddClick}>+ Add Product</Button>

      <div className="bg-white p-4 rounded-xl border border-slate-200 w-full shadow-sm flex flex-wrap items-center gap-4">
        <input
          type="search"
          placeholder="Search products..."
          className="flex-grow border border-slate-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={onSearchChange}
        />
        <select
          className="border border-slate-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedCategory}
          onChange={onCategoryChange}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
        <select
          className="border border-slate-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={sortBy}
          onChange={onSortChange}
        >
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="price-asc">Price (Low-High)</option>
          <option value="price-desc">Price (High-Low)</option>
          <option value="stock-asc">Stock (Low-High)</option>
          <option value="stock-desc">Stock (High-Low)</option>
        </select>
        <Button variant="secondary" onClick={onClearFilters}>Clear Filters</Button>
      </div>
    </section>
  );
}
