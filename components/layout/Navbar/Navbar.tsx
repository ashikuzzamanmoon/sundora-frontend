"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Truck,
  ShieldCheck,
  Search,
  CircleUserRound,
  ShoppingBag,
  X,
} from "lucide-react";
import allProducts from "@/data/products.json";
import { useCart } from "@/context/CartContext";
import CartModal from "@/components/cart/CartModal";
import navigationData from "@/data/navigation.json";
import { Transition } from '@headlessui/react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const Navbar = () => {
  const { toggleCart, itemCount } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [openPopover, setOpenPopover] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }
    const results = allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);

  // To close the search bar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // function to close input field
  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchTerm("");
  };


  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
    }
    setOpenPopover(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
        setOpenPopover(null);
    }, 200); // 200ms delay to allow moving mouse into the panel
  };

  return (
    <>
      <header className="bg-white top-0 shadow-sm">
        {/* ===== TOP BAR ===== */}
        <div className="bg-[#2a676b] text-white">
          <div className="container mx-auto px-6 py-3 flex justify-center items-center text-sm space-x-12">
            <div className="flex items-center space-x-2">
              <Phone size={14} />
              <span>+880 1966 444455</span>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <Truck size={14} />
              <span>FREE SHIPPING</span>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <ShieldCheck size={14} />
              <span>100% AUTHENTIC</span>
            </div>
          </div>
        </div>

        {/* ===== MAIN HEADER ===== */}
        <div className="mx-auto px-6 py-6 flex justify-between items-center relative">
          <div className="w-1/3"></div>
          <div className="w-1/3 flex justify-center">
            <Link href="/">
              <Image
                src="/images/logo/black_logo.png"
                alt="Sundora Logo"
                width={100}
                height={30}
                priority
              />
            </Link>
          </div>

          {/* ===== Right Icons & Search ===== */}
          <div className="w-1/3 flex justify-end items-center space-x-4">
            <div ref={searchContainerRef} className="flex items-center">
              <div
                className={`flex items-center bg-[#f2f6f6] transition-all duration-300 ease-in-out overflow-hidden ${
                  isSearchOpen ? "w-64" : "w-0"
                }`}
              >
                <div className="relative w-64">
                  {" "}
                  <span
                    className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
                    onClick={closeSearch}
                  >
                    <X size={18} />
                  </span>
                  <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  />
                </div>
              </div>

              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-600 hover:text-black cursor-pointer"
              >
                <Search size={22} />
              </button>
            </div>

            <button className="text-gray-600 hover:text-black cursor-pointer">
              <CircleUserRound size={22} />
            </button>
            <button
              onClick={toggleCart}
              className="relative text-gray-600 hover:text-black cursor-pointer"
            >
              <ShoppingBag size={22} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* search result dropdown */}
            {isSearchOpen && searchTerm && (
              <div className="absolute top-full right-32 -mt-4 w-64 bg-white shadow-2xl z-50">
                <ul className="divide-y max-h-96 overflow-y-auto">
                  {searchResults.map((product) => (
                    <li key={product.id}>
                      <Link
                        href={`/products/${product.id}`}
                        className="flex items-center p-3 hover:bg-gray-50"
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={50}
                          height={50}
                          className="object-cover"
                        />
                        <span className="ml-4 flex-grow text-gray-700">
                          {product.name}
                        </span>
                        <span className="text-gray-900 font-semibold">
                          ৳{product.price.toLocaleString()}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                {searchResults.length > 0 && (
                  <div className="p-3 border-t text-center">
                    <button className="text-blue-600 hover:underline">
                      Total Search ({searchResults.length})
                    </button>
                  </div>
                )}
                {searchResults.length === 0 && (
                  <div className="p-4 text-center text-gray-500">
                    No products found.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
      {/* ===== NAVIGATION LINKS ===== */}
      <nav className="hidden md:block sticky top-0 z-40 bg-white shadow-md">
        <div className="container mx-auto px-6 flex justify-center items-center h-12">
          <ul className="flex items-center space-x-16 text-sm font-medium tracking-wider">
            {navigationData.map((item) => (
              <li 
                key={item.name} 
                onMouseEnter={() => item.subNavigation && handleMouseEnter(item.name)} 
                onMouseLeave={() => item.subNavigation && handleMouseLeave()}
                className="relative"
              >
                <Link 
                    href={item.href} 
                    className={`uppercase outline-none transition-colors ${openPopover === item.name ? 'text-teal-600' : 'text-gray-700 hover:text-black'}`}
                >
                  {item.name}
                </Link>
                {item.subNavigation && (
                  <Transition
                    show={openPopover === item.name}
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-1/2 -translate-x-1/2 pt-3 w-screen max-w-5xl px-4 z-20">
                      <div className="overflow-hidden rounded shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-8 bg-white p-7 grid-cols-4">
                          {/* left side link */}
                          <div className="col-span-1 space-y-3">
                            <h3 className="font-bold text-base">{item.name}</h3>
                            {item.subNavigation.map((subItem) => (
                              <Link key={subItem.name} href={subItem.href} className="block text-gray-500 hover:text-black hover:underline">{subItem.name}</Link>
                            ))}
                          </div>
                          {/* right side product */}
                          <div className="col-span-3">
                            <p className="text-gray-500 mb-2">We recommend:</p>
                            <div className="grid grid-cols-4 gap-4">
                              {allProducts.filter(p => item.featuredProductIds?.includes(p.id)).map(product => (
                                <Link href={`/products/${product.id}`} key={product.id} className="group">
                                  <div className="bg-gray-100 rounded-md overflow-hidden aspect-square">
                                    <Image src={product.image} alt={product.name} width={150} height={150} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                                  </div>
                                  <p className="text-xs mt-2 font-semibold uppercase">{product.brand}</p>
                                  <p className="text-xs text-gray-600 line-clamp-1">{product.name}</p>
                                  <p className="text-sm font-bold mt-1">From ৳{product.variants[0].price.toLocaleString()}</p>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Transition>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <CartModal />
    </>
  );
};

export default Navbar;
