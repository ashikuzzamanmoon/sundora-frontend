// app/page.tsx
import AnnouncementBar from "@/components/common/AnnouncementBar";
import FeaturedBrands from "@/components/home/FeaturedBrands/FeaturedBrands";
import HeroSlider from "@/components/home/HeroSlider/HeroSlider";
import ProductCarousel from "@/components/home/shared/ProductCarousel/ProductCarousel";
import allProducts from "@/data/products.json";

const Home = () => {
  const favouriteProducts = allProducts.filter(
    (product) => product.isFavourite
  );
  const newArrivalProducts = allProducts.filter(
    (product) => product.isNewArrival
  );
  return (
    <>
      <AnnouncementBar />
      <HeroSlider />
      <FeaturedBrands />
      <ProductCarousel
        title="SUNDORA FAVOURITES"
        products={favouriteProducts}
      />
      <ProductCarousel title="NEW ARRIVALS" products={newArrivalProducts} />

      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center">Welcome to Sundora</h1>
        <p className="text-center text-gray-600 mt-4">
          Your destination for authentic beauty products.
        </p>
      </div>
    </>
  );
};

export default Home;
