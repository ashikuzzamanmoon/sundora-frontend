// components/products/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  brand: string;
  name: string;
  type: string;
  originalPrice: number;
  price: number;
  discount: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="hover:shadow-md">
      <Link href={`/products/${product.id}`} className="block group">
        <div className="relative p-4 rounded-md overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="object-contain h-56 md:h-64 w-full transition-transform duration-300 group-hover:scale-105"
          />
          {product.discount > 0 && (
            <div className="absolute top-3 right-6 bg-[#e3c886] text-black text-xs rounded-full w-12 md:w-14 h-12 md:h-14 flex flex-col items-center justify-center leading-tight">
              <span>Up to</span>
              <span>-{product.discount}%</span>
            </div>
          )}
        </div>
        <div className="md:mt-4 ml-4 text-center md:text-left">
          <p className="text-sm text-gray-500 tracking-widest">
            {product.brand}
          </p>
          <h3 className="mt-1 font-medium text-sm text-gray-800">
            {product.name}
          </h3>
          <p className="text-[10px] md:text-xs text-gray-400">{product.type}</p>
          <div className="mt-2 text-sm">
            <span className="block md:inline md:mr-2">From</span>

            <div className="flex justify-center md:inline-flex items-baseline space-x-2">
              <span className="text-gray-400 line-through">
                ৳{product.originalPrice.toLocaleString()}
              </span>
              <span className="text-[#e3c886] font-semibold">
                ৳{product.price.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
