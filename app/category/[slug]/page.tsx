// app/category/[slug]/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import allProductsData from "@/data/products.json";
import { Product } from "@/types";
import FilterSidebar from "@/components/filters/FilterSidebar";
import ProductGrid from "@/components/products/ProductGrid";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

const allProducts: Product[] = allProductsData as Product[];

const sortOptions = [
  { name: "Sort By", value: "default" },
  { name: "Name: A-Z", value: "name-asc" },
  { name: "Name: Z-A", value: "name-desc" },
  { name: "Price: Low to High", value: "price-asc" },
  { name: "Price: High to Low", value: "price-desc" },
];

const categoryLinks = [
  { name: "FRAGRANCE", href: "/category/fragrance" },
  { name: "SKINCARE", href: "/category/skincare" },
  { name: "MAKEUP", href: "/category/makeup" },
  { name: "HAIR AND BODY", href: "/category/hair-and-body" },
  { name: "CANDLE AND HOME", href: "/category/candle-and-home" },
];

const CategoryPage = () => {
  const params = useParams();
  const slug = params.slug as string;

  const [initialProducts, setInitialProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState("default");
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    if (!slug) return;

    let productsToShow: Product[] = [];
    let title = "";
    const formattedSlug = slug.replace(/-/g, " ");

    if (slug === "sale") {
      productsToShow = allProducts.filter((p) => p.isSale);
      title = "Sale";
    } else if (slug === "new-arrivals") {
      productsToShow = allProducts.filter((p) => p.isNewArrival);
      title = "New Arrivals";
    } else {
      // প্রথমে category/tag হিসেবে খোঁজা হচ্ছে
      productsToShow = allProducts.filter((product) =>
        product.categories?.some(
          (category) => category.toLowerCase() === formattedSlug
        )
      );
      title = formattedSlug;

      if (productsToShow.length === 0) {
        productsToShow = allProducts.filter(
          (p) =>
            p.brand?.toLowerCase().replace(/ /g, "-") === slug.toLowerCase()
        );
        if (productsToShow.length > 0) {
          title = productsToShow[0].brand;
        }
      }
    }

    setInitialProducts(productsToShow);
    setFilteredProducts(productsToShow);
    setPageTitle(title.toUpperCase());
  }, [slug]);

  // সর্টিংয়ের জন্য নতুন useEffect
  useEffect(() => {
    const sortedProducts = [...initialProducts]; // প্রাথমিক তালিকা থেকে শুরু করুন

    switch (sortOption) {
      case "name-asc":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        sortedProducts.sort((a, b) => {
          const priceA = a.variants?.[0]?.price ?? 0;
          const priceB = b.variants?.[0]?.price ?? 0;
          return priceA - priceB;
        });
        break;
      case "price-desc":
        sortedProducts.sort((a, b) => {
          const priceA = a.variants?.[0]?.price ?? 0;
          const priceB = b.variants?.[0]?.price ?? 0;
          return priceB - priceA;
        });
        break;
      default:
        // 'default' এর জন্য কোনো পরিবর্তন নেই
        break;
    }

    setFilteredProducts(sortedProducts);
  }, [sortOption, initialProducts]);

  return (
    <div className="container mx-auto px-6 py-8">
      {/* --- Breadcrumbs and Banner ... */}
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:underline">
          HOME
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 uppercase">{pageTitle}</span>
      </div>
      <div className="bg-gray-100 p-8 rounded-lg mb-8 text-center">
        <h1 className="text-3xl font-bold">{pageTitle}</h1>
        <p className="mt-2 text-gray-600">Discover our curated selection.</p>
      </div>

      {/* --- top filter bar --- */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 p-4 border rounded-md">
        <div className="flex items-center space-x-4">
          <span className="font-semibold">FILTER RESULTS</span>
          <button className="text-xs text-gray-500 hover:underline">
            Reset Filters
          </button>
        </div>

        <div className="flex flex-col space-y-2 w-full mt-4 md:flex-row md:space-y-0 md:space-x-2 md:w-auto md:mt-0">
          {/* Category Dropdown */}
          <Menu as="div" className="relative w-full md:w-auto">
            <Menu.Button className="flex items-center justify-between w-full text-sm border px-3 py-1.5 rounded-md">
              <span>CATEGORY</span>
              <ChevronDown size={16} className="ml-1" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white shadow-lg rounded-md z-10">
              <div className="p-1">
                {categoryLinks.map((link) => (
                  <Menu.Item key={link.href}>
                    {({ active }) => (
                      <Link
                        href={link.href}
                        className={`${
                          active ? "bg-gray-100" : ""
                        } block px-4 py-2 text-sm text-gray-700 rounded-md`}
                      >
                        {link.name}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Menu>

          {/* Sort By Dropdown */}
          <Menu as="div" className="relative w-full md:w-48">
            <Menu.Button className="flex items-center justify-between w-full text-sm border px-3 py-1.5 rounded-md">
              <span>
                {sortOptions.find((opt) => opt.value === sortOption)?.name}
              </span>
              <ChevronDown size={16} className="ml-1" />
            </Menu.Button>
            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-full origin-top-right bg-white shadow-lg rounded-md z-10">
                <div className="p-1">
                  {sortOptions.map((option) => (
                    <Menu.Item key={option.value}>
                      {({ active }) => (
                        <button
                          onClick={() => setSortOption(option.value)}
                          className={`${
                            active ? "bg-gray-100" : ""
                          } group flex rounded-md items-center w-full px-4 py-2 text-sm text-gray-700`}
                        >
                          {option.name}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
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
