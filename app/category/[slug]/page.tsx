// app/category/[slug]/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import allProductsData from "@/data/products.json";
import { Product } from "@/types";
import FilterSidebar from "@/components/filters/FilterSidebar";
import ProductGrid from "@/components/products/ProductGrid";
import Link from "next/link";
// Headless UI থেকে Menu ইম্পোর্ট করুন
import { Menu } from '@headlessui/react';
import { ChevronDown } from "lucide-react";

const allProducts: Product[] = allProductsData as Product[];

const CategoryPage = () => {
  const params = useParams();
  const categorySlug = params.slug as string;

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  // URL slug অনুযায়ী প্রাথমিক প্রোডাক্টগুলো useMemo দিয়ে নেওয়া হলো
  const initialProducts = useMemo(() => {
    if (!categorySlug) return [];
    return allProducts.filter(
      p => p.category?.toLowerCase() === categorySlug.toLowerCase().replace('%20', ' ')
    );
  }, [categorySlug]);

  // ভবিষ্যতে ফিল্টারিংয়ের জন্য স্টেট
  useEffect(() => {
    setFilteredProducts(initialProducts);
  }, [initialProducts]);

  const categoryName = categorySlug.replace('%20', ' ').toUpperCase();

  return (
    <div className="container mx-auto px-6 py-8">
      {/* --- Breadcrumbs --- */}
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:underline">HOME</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">FILTERED RESULT</span>
      </div>
      
      {/* --- ব্যানার --- */}
      <div className="bg-gray-100 p-8 rounded-lg mb-8 text-center">
        <h1 className="text-3xl font-bold">Experience True {categoryName}</h1>
        <p className="mt-2 text-gray-600">Reveal your skin&apos;s radiance with our curated skincare products.</p>
      </div>
      
      {/* --- টপ ফিল্টার বার --- */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 p-4 border rounded-md">
        <div className="flex items-center space-x-4">
          <span className="font-semibold">FILTER RESULTS</span>
          <button className="text-xs text-gray-500 hover:underline">Reset Filters</button>
        </div>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          {/* Example Dropdown using Headless UI */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center text-sm border px-3 py-1.5 rounded-md">CATEGORY <ChevronDown size={16} className="ml-1" /></Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white shadow-lg rounded-md z-10">
              <div className="p-1"><Menu.Item><a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Skincare</a></Menu.Item></div>
              <div className="p-1"><Menu.Item><a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Makeup</a></Menu.Item></div>
            </Menu.Items>
          </Menu>
          {/* আরও ড্রপডাউন এখানে যোগ হবে */}
          <div className="text-sm border px-3 py-1.5 rounded-md">SORT BY</div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <FilterSidebar />
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
};

export default CategoryPage;