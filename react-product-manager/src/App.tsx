import { Header } from './components/Header';
import { Controls } from './components/FilterControls';
import { ProductList } from './components/ProductList';
import { Modal } from './components/Modal.tsx';
import { useState } from 'react';
import type { Product } from './types/types.ts';
import { ConfirmationModal } from './components/ConfirmationModal.tsx';

const mockProducts: Product[] = [
  { id: 1, name: 'Wireless Headphones', price: 99.99, category: 'Electronics', stock: 25 },
  { id: 2, name: 'Running Shoes', price: 129.99, category: 'Sports', stock: 15 },
  { id: 3, name: 'Coffee Mug', price: 12.99, category: 'Home', stock: 50 },
  { id: 4, name: 'Smartphone Case', price: 24.99, category: 'Electronics', stock: 3 },
  { id: 5, name: 'Yoga Mat', price: 39.99, category: 'Sports', stock: 0 },
];

const initialNewProductState = { name: '', price: 0, category: '', stock: 0 };

function App() {
  const [products, setProducts] = useState<Product[]>(mockProducts);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProductData, setNewProductData] = useState(initialNewProductState);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editFormData, setEditFormData] = useState<Product | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDeleteId, setProductToDeleteId] = useState<number | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const filteredAndSortedProducts = products
    .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(product => selectedCategory === 'all' || product.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'name-asc': return a.name.localeCompare(b.name);
        case 'name-desc': return b.name.localeCompare(a.name);
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'stock-asc': return a.stock - b.stock;
        case 'stock-desc': return b.stock - a.stock;
        default: return 0;
      }
    });

  const handleNewProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProductData(prevData => ({
      ...prevData,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleConfirmAdd = () => {
    setProducts(prevProducts => [...prevProducts, { id: Date.now(), ...newProductData }]);
    setIsAddModalOpen(false);
    setNewProductData(initialNewProductState);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setEditFormData(product);
    setIsEditModalOpen(true);
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editFormData) return;
    const { name, value } = e.target;
    setEditFormData(prevData => ({
      ...prevData!,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleUpdateProduct = () => {
    if (!editFormData || !editingProduct) return;
    setProducts(currentProducts =>
      currentProducts.map(p => (p.id === editingProduct.id ? editFormData : p))
    );
    setIsEditModalOpen(false);
    setEditingProduct(null);
    setEditFormData(null);
  };

  const handleOpenDeleteModal = (id: number) => {
    setProductToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (productToDeleteId === null) return;
    setProducts(currentProducts => currentProducts.filter(p => p.id !== productToDeleteId));
    setIsDeleteModalOpen(false);
    setProductToDeleteId(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSortBy('name-asc');
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Header />
        <Controls
          onAddClick={() => setIsAddModalOpen(true)}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          categories={categories}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          onClearFilters={handleClearFilters}
        />
        <ProductList
          products={filteredAndSortedProducts}
          onEditProduct={handleOpenEditModal}
          onDeleteProduct={handleOpenDeleteModal}
        />
      </main>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleConfirmAdd}
        title="Add New Product"
        submitButtonText="Add Product"
      >
        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Product Name</label>
            <input type="text" name="name" value={newProductData.name} onChange={handleNewProductChange} className="w-full border border-slate-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Price ($)</label>
            <input type="number" name="price" value={newProductData.price} onChange={handleNewProductChange} className="w-full border border-slate-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Category</label>
            <input type="text" name="category" value={newProductData.category} onChange={handleNewProductChange} className="w-full border border-slate-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Stock</label>
            <input type="number" name="stock" value={newProductData.stock} onChange={handleNewProductChange} className="w-full border border-slate-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </form>
      </Modal>

      {editFormData && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleUpdateProduct}
          title="Edit Product"
          submitButtonText="Update Product"
        >
          <form className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Product Name</label>
              <input type="text" name="name" value={editFormData.name} onChange={handleEditFormChange} className="w-full border border-slate-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Price ($)</label>
              <input type="number" name="price" value={editFormData.price} onChange={handleEditFormChange} className="w-full border border-slate-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Category</label>
              <input type="text" name="category" value={editFormData.category} onChange={handleEditFormChange} className="w-full border border-slate-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Stock</label>
              <input type="number" name="stock" value={editFormData.stock} onChange={handleEditFormChange} className="w-full border border-slate-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </form>
        </Modal>
      )}

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
      >
        <p>Are you sure you want to delete this product? This action cannot be undone.</p>
      </ConfirmationModal>
    </div>
  );
}

export default App;