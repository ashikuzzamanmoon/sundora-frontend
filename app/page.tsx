// app/page.tsx
import AnnouncementBar from '@/components/common/AnnouncementBar';
import HeroSlider from '@/components/home/HeroSlider/HeroSlider';

const Home = () => {
  return (
    <>
      <AnnouncementBar />
      <HeroSlider />

      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center">
          Welcome to Sundora
        </h1>
        <p className="text-center text-gray-600 mt-4">
          Your destination for authentic beauty products.
        </p>
      </div>
    </>
  );
};

export default Home;