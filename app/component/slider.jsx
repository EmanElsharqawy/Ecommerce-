"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  "WhatsApp Image 2026-09-10 at 10.58.36.jpeg",
  "Screenshot 2026-09-10 at 1.58.39 PM.png",
  "Screenshot 2026-09-10 at 1.58.49 PM.png",
];

export default function Slider() {
  return (
    <section className="container mx-auto my-3 w-full max-w-[1400px] px-3 sm:my-4 sm:px-4 md:my-6 md:px-6">
      <Swiper
        modules={[
          Navigation,
          Pagination,
          Autoplay,
          EffectFade,
        ]}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        loop
        navigation
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="hero-slider aspect-[16/7] w-full overflow-hidden rounded-lg sm:aspect-[16/6] sm:rounded-xl md:aspect-[16/5.5] lg:max-h-[560px]"
      >
        {slides.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="h-full w-full object-cover object-center"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}