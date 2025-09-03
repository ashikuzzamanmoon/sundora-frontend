"use client";

import { useState, useEffect, useRef } from "react";
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

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: "SALE", href: "/sale" },
    { name: "NEW", href: "/new" },
    { name: "BRANDS", href: "/brands" },
    { name: "FRAGRANCE", href: "/fragrance" },
    { name: "SKINCARE", href: "/skincare" },
    { name: "MAKEUP", href: "/makeup" },
    { name: "HAIR & BODY", href: "/hair-body" },
    { name: "CANDLE & HOME", href: "/candle-home" },
  ];

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

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
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
      <div className="container mx-auto px-6 py-6 flex justify-between items-center relative">
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
              className={`flex items-center transition-all duration-300 ease-in-out overflow-hidden ${
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
                  className="w-full pl-9 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
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
          <button className="relative text-gray-600 hover:text-black cursor-pointer">
            <ShoppingBag size={22} />
            <span className="absolute -top-1 -right-2 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              0
            </span>
          </button>

          {/* search result dropdown */}
          {isSearchOpen && searchTerm && (
            <div className="absolute top-full right-32 -mt-4 w-64 bg-white border rounded-lg shadow-lg">
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

      {/* ===== NAVIGATION LINKS ===== */}
      <nav className="">
        <div className="container mx-auto px-6 flex justify-center items-center h-12">
          <ul className="flex items-center space-x-16 text-sm font-medium tracking-wider">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-gray-700 hover:text-black uppercase"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
