import { Header } from './components/Header';
import { Controls } from './components/FilterControls';
import { ProductList } from './components/ProductList';

const mockProducts = [
    { id: 1, name: 'Wireless Headphones', price: 99.99, category: 'Electronics', stock: 25 },
    { id: 2, name: 'Running Shoes', price: 129.99, category: 'Sports', stock: 15 },
    { id: 3, name: 'Coffee Mug', price: 12.99, category: 'Home', stock: 50 },
    { id: 4, name: 'Smartphone Case', price: 24.99, category: 'Electronics', stock: 3 },
    { id: 5, name: 'Yoga Mat', price: 39.99, category: 'Sports', stock: 0 },
];

function App() {

    return (
        <div className="bg-slate-50 min-h-screen">
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Header />
                <Controls />
                <ProductList products={mockProducts} />
            </main>
        </div>
    );
}

export default App;