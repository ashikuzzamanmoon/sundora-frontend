'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link'; // SHOP NOW বাটনের জন্য Link ইম্পোর্ট করা হলো

const sliderImages = [
  '/images/slider/slider.jpg',
  '/images/slider/slider1.jpg',
  '/images/slider/slider2.jpg',
  '/images/slider/slider3.webp',
  '/images/slider/slider4.webp',
  '/images/slider/slider5.webp',
];

const HeroSlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, setSelectedIndex]);

  return (
    <section className="relative w-full">
      {/* ইমেজ হাইট পরিবর্তন করা হয়েছে, h-screen এর বদলে নির্দিষ্ট h-[500px] বা md:h-[600px] */}
      <div className="overflow-hidden h-[500px] md:h-[600px] lg:h-[700px]" ref={emblaRef}>
        <div className="flex h-full">
          {sliderImages.map((src, index) => (
            <div className="relative flex-[0_0_100%] h-full" key={index}>
              <Image
                src={src}
                alt={`Slider image ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* SHOP NOW Button - ডট ইন্ডিকেটরের একটু উপরে */}
      {/* bottom-24 বা তোমার প্রয়োজন অনুযায়ী দূরত্ব সেট করতে পারো */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20">
        <Link href="/products"> {/* সাধারণত SHOP NOW বাটন প্রোডাক্ট পেজে যায় */}
          <button className="px-10 py-4 bg-gray-700 bg-opacity-70 text-white text-xl font-semibold border border-gray-400 hover:bg-gray-800 hover:bg-opacity-80 transition-colors duration-300">
            SHOP NOW
          </button>
        </Link>
      </div>


      {/* Previous Button */}
      <button
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md z-20"
        onClick={scrollPrev}
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Next Button */}
      <button
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md z-20"
        onClick={scrollNext}
        aria-label="Next slide"
      >
        <ChevronRight size={28} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            className={`h-1 w-8 rounded-full transition-all duration-300 ${
              index === selectedIndex ? 'bg-white' : 'bg-gray-400 opacity-70'
            }`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;