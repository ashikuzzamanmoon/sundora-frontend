// components/layout/Navbar/Navbar.tsx

import Link from "next/link";
import {
  Phone,
  Truck,
  ShieldCheck,
  Search,
  CircleUserRound,
  ShoppingBag,
} from "lucide-react";

const Navbar = () => {
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

  return (
    <header className="bg-white">
      {/* ===== 1. TOP BAR ===== */}
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

      {/* ===== 2. MAIN HEADER (Logo & Icons) ===== */}
      <div className=" mx-auto px-6 py-6 flex justify-between items-center">
        {/* Left side is empty for spacing */}
        <div className="w-1/3"></div>

        {/* Center Logo */}
        <div className="w-1/3 flex justify-center">
          <Link href="/">
            <div className="text-center">
              <span className="text-4xl font-serif tracking-widest">
                SUNDORA
              </span>
              <p className="text-xs tracking-[0.3em]">BEAUTY</p>
            </div>
          </Link>
        </div>

        {/* Right Icons */}
        <div className="w-1/3 flex justify-end items-center space-x-4">
          <button className="text-gray-600 hover:text-black">
            <Search size={22} />
          </button>
          <button className="text-gray-600 hover:text-black">
            <CircleUserRound size={22} />
          </button>
          <button className="relative text-gray-600 hover:text-black">
            <ShoppingBag size={22} />
            <span className="absolute -top-1 -right-2 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </div>

      {/* ===== 3. NAVIGATION LINKS ===== */}
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
