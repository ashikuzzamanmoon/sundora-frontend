// components/products/RecommendedProducts.tsx
"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/products/ProductCard";
import allProductsData from "@/data/products.json";


// base variant type
interface BaseVariant {
  id: number;
  name: string;
  originalPrice: number;
  price: number;
  discount: number;
}

// color variant with hexCode
interface ColorVariant extends BaseVariant {
  hexCode: string;
}

// size variant like as base variant 
type SizeVariant = BaseVariant;

// A Union type that can be a size or color variant
type Variant = SizeVariant | ColorVariant;

interface Product {
  id: number;
  brand: string;
  name: string;
  type: string;
  image: string;
  originalPrice: number;
  price: number;
  discount: number;
  isFavourite: boolean;
  isNewArrival: boolean;
  variants?: Variant[]; 
}

interface RecommendedProductsProps {
  currentProductId: number;
}

const RecommendedProducts = ({
  currentProductId,
}: RecommendedProductsProps) => {
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const allProducts: Product[] = allProductsData as Product[];

    const filtered = allProducts.filter(
      (p) => p.id !== currentProductId && p.variants && p.variants.length > 0
    );

    const shuffled = [...filtered];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    setRecommendedProducts(shuffled.slice(0, 4));
  }, [currentProductId]);

  return (
    <div className="mt-12 bg-white py-12">
      <div className="container mx-auto px-3 md:px-6">
        <h2 className="text-xl md:text-2xl tracking-[0.3em] text-gray-700 text-center mb-10">
          PEOPLE ALSO LIKED
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recommendedProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedProducts;