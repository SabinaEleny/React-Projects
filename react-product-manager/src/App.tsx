import { Header } from './components/Header';
import { Controls } from './components/FilterControls';
import { ProductList } from './components/ProductList';
import { Modal } from './components/Modal.tsx';
import { useState } from 'react';
import type { Product } from './types/types.ts';
import { ConfirmationModal } from './components/ConfirmationModal.tsx';

const mockProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    category: 'Electronics',
    stock: 25,
  },
  {
    id: 2,
    name: 'Running Shoes',
    price: 129.99,
    category: 'Sports',
    stock: 15,
  },
  { id: 3, name: 'Coffee Mug', price: 12.99, category: 'Home', stock: 50 },
  {
    id: 4,
    name: 'Smartphone Case',
    price: 24.99,
    category: 'Electronics',
    stock: 3,
  },
  { id: 5, name: 'Yoga Mat', price: 39.99, category: 'Sports', stock: 0 },
];

const initialNewProductState = {
  name: '',
  price: 0,
  category: '',
  stock: 0,
};

function App() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProductData, setNewProductData] = useState(initialNewProductState);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDeleteId, setProductToDeleteId] = useState<number | null>(
    null
  );

  const handleNewProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProductData((prevData) => ({
      ...prevData,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) : value,
    }));
  };

  const handleConfirmAdd = () => {
    setProducts((prevProducts) => [
      ...prevProducts,
      {
        id: Date.now(),
        ...newProductData,
      },
    ]);

    console.log('Product added:', newProductData);

    setIsAddModalOpen(false);
    setNewProductData(initialNewProductState);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteModal = (id: number) => {
    setProductToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (productToDeleteId === null) return;

    setProducts((currentProducts) =>
      currentProducts.filter((p) => p.id !== productToDeleteId)
    );

    console.log(`Product with ID ${productToDeleteId} deleted.`);

    setIsDeleteModalOpen(false);
    setProductToDeleteId(null);
  };

  const handleUpdateProduct = () => {
    console.log('Updating product:', editingProduct);

    //TO DO EDIT
    setIsEditModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Header />
        <Controls onAddClick={() => setIsAddModalOpen(true)} />
        <ProductList
          products={products}
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
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={newProductData.name}
              onChange={handleNewProductChange}
              className="w-full border border-slate-300 rounded-md py-2 px-3"
            />
          </div>
          <div>
            <label>Price ($)</label>
            <input
              type="number"
              name="price"
              value={newProductData.price}
              onChange={handleNewProductChange}
              className="w-full border border-slate-300 rounded-md py-2 px-3"
            />
          </div>
          <div>
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={newProductData.category}
              onChange={handleNewProductChange}
              className="w-full border border-slate-300 rounded-md py-2 px-3"
            />
          </div>
          <div>
            <label>Stock</label>
            <input
              type="number"
              name="stock"
              value={newProductData.stock}
              onChange={handleNewProductChange}
              className="w-full border border-slate-300 rounded-md py-2 px-3"
            />
          </div>
        </form>
      </Modal>

      {editingProduct && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleUpdateProduct}
          title="Edit Product"
          submitButtonText="Update Product"
        >
          <form className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Product Name
              </label>
              <input
                type="text"
                defaultValue={editingProduct.name}
                className="w-full border border-slate-300 rounded-md py-2 px-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Price ($)
              </label>
              <input
                type="number"
                defaultValue={editingProduct.price}
                className="w-full border border-slate-300 rounded-md py-2 px-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Category
              </label>
              <input
                type="text"
                defaultValue={editingProduct.category}
                className="w-full border border-slate-300 rounded-md py-2 px-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Stock
              </label>
              <input
                type="number"
                defaultValue={editingProduct.stock}
                className="w-full border border-slate-300 rounded-md py-2 px-3"
              />
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
        <p>
          Are you sure you want to delete this product? This action cannot be
          undone.
        </p>
      </ConfirmationModal>
    </div>
  );
}

export default App;
