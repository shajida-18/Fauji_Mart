import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import HomeNav from "./HomeNav";

export default function Home() {
  const slides = [
    {
      image: "/images/slide1.jpeg",
      title: "Groceries at Subsidized Rates",
      description:
        "Daily essentials and groceries exclusively for defense personnel.",
    },
    {
      image: "/images/slide3.jpeg",
      title: "Electronics Bonanza",
      description: "Laptops, TVs & Mobiles at special CSD rates!",
    },
    {
      image: "/images/slide4.jpeg",
      title: "Quality Food Items",
      description: "Fresh snacks, beverages, and daily food essentials.",
    },
    {
      image: "/images/slide5.jpeg",
      title: "Shop with Convenience",
      description: "Authorized CSD canteens across military stations.",
    },
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">
      <HomeNav />

      {/* Carousel */}
      <div className="relative max-w-5xl mx-auto mt-6 overflow-hidden rounded-2xl shadow-2xl h-64 sm:h-96">
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className="min-w-full h-full relative overflow-hidden group"
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
              />

              {/* Shaded overlay + highlighted text */}
              <div className="absolute inset-0 flex flex-col justify-end items-center text-center p-6 sm:p-10">
                <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>
                <div className="relative z-10">
                  <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-2 drop-shadow-2xl">
                    {slide.title}
                  </h2>
                  <p className="text-lg sm:text-2xl text-white drop-shadow-lg">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Arrows */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-3 rounded-full z-30"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-3 rounded-full z-30"
        >
          <FaChevronRight />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`w-3 h-3 rounded-full ${
                idx === current ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Login Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 px-4">
        <Link
          to="/login-army"
          className="bg-orange-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-orange-600 transition-all shadow-lg"
        >
          🎖️ Defense Personnel Login
        </Link>
        <Link
          to="/login-canteen"
          className="bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-green-700 transition-all shadow-lg"
        >
          🏪 CSD Canteen Login
        </Link>
      </div>
    </div>
  );
}
