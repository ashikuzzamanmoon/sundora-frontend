// components/home/GenderSection/GenderSection.tsx
import Image from "next/image";
import Link from "next/link";

const GenderSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-2xl tracking-[0.3em] text-gray-700">
            SHOP FOR HIM | HER
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* কার্ড ১: For Him */}
          <Link href="/shop/him" className="block group">
            <div className="relative overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/images/gender/for-him.webp"
                alt="Perfume for Him"
                width={800}
                height={600}
                className="object-cover w-full h-auto transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </Link>

          {/* কার্ড ২: For Her */}
          <Link href="/shop/her" className="block group">
            <div className="relative overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/images/gender/for-her.webp"
                alt="Perfume for Her"
                width={800}
                height={600}
                className="object-cover w-full h-auto transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GenderSection;
