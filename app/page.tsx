// app/page.tsx
import AnnouncementBar from "@/components/common/AnnouncementBar";
import AboutSection from "@/components/home/AboutSection/AboutSection";
import CategorySection from "@/components/home/CategorySection/CategorySection";
import FeaturedBrands from "@/components/home/FeaturedBrands/FeaturedBrands";
import GenderSection from "@/components/home/GenderSection/GenderSection";
import HeroSlider from "@/components/home/HeroSlider/HeroSlider";
import ProductCarousel from "@/components/home/shared/ProductCarousel/ProductCarousel";
import StoriesSection from "@/components/home/StoriesSection/StoriesSection";
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
      <CategorySection />
      <GenderSection />
      <StoriesSection />
      <AboutSection />
    </>
  );
};

export default Home;
