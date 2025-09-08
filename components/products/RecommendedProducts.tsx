// components/products/RecommendedProducts.tsx
"use client";

import Link from "next/link";
import ProductCard from "@/components/products/ProductCard";
import allProductsData from "@/data/products.json";
import { Product } from "@/types"; // পরিবর্তন: সেন্ট্রাল টাইপ ফাইল থেকে ইম্পোর্ট

const allProducts: Product[] = allProductsData as Product[];

interface RecommendedProductsProps {
  currentProductId: number;
}

const RecommendedProducts = ({
  currentProductId,
}: RecommendedProductsProps) => {
  const filteredProducts = allProducts
    .filter(
      (p) => p.id !== currentProductId && p.variants && p.variants.length > 0
    )
    .slice(0, 4);

  return (
    <div className="mt-12 bg-white py-12">
      <div className="container mx-auto px-3 md:px-6">
        <h2 className="text-xl md:text-2xl tracking-[0.3em] text-gray-700 text-center mb-10">
          PEOPLE ALSO LIKED
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedProducts;
