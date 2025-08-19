import logo from '../assets/shopping-bags.png';

export function Header() {
    return (
        <header className="flex flex-col items-center justify-center mb-12 text-center">
            <div className="flex items-center ">
                <img src={logo} alt="Shopping bags logo" className="h-25 w-auto" />
                <h1 className="text-4xl font-extrabold text-slate-800">Product Manager</h1>
            </div>
            <p className="text-lg text-slate-500">Manage your products with ease</p>
        </header>
    );
}


