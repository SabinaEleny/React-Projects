import { Button } from './Button';

export function Controls({ onAddClick }: { onAddClick: () => void }) {
  return (
    <section className="mb-12 flex flex-col items-start gap-6">
      <Button variant="primary" onClick={onAddClick}>
        + Add Product
      </Button>

      <div className="bg-white p-4 rounded-xl border border-slate-200 w-full shadow-sm flex flex-wrap items-center gap-4">
        <input
          type="search"
          placeholder="Search products..."
          className="flex-grow border border-slate-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select className="border border-slate-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>All Categories</option>
        </select>
        <select className="border border-slate-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Name (A-Z)</option>
        </select>
        <Button variant="secondary">Clear Filters</Button>
      </div>
    </section>
  );
}
