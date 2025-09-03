import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Sundora
        </Link>
        <div className="space-x-4">
          <Link href="/products" className="text-gray-600 hover:text-gray-800">All Products</Link>
          <Link href="/categories" className="text-gray-600 hover:text-gray-800">Categories</Link>
          <Link href="/brands" className="text-gray-600 hover:text-gray-800">Brands</Link>
        </div>
        <div>
          {/* Icons for Search, Wishlist, Cart can be added here */}
          <span className="text-gray-600">Cart (0)</span>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;