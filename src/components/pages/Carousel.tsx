"use client"

import React, { useState, useEffect,  useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // Track direction of animation

  // Function to handle next slide
  const handleNext = () => {
    setDirection(1); // Set direction to right
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to handle previous slide
  const handlePrev = useCallback(() => {
    setDirection(-1); // Set direction to left
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  },[setCurrentIndex, setDirection, images.length]);

  // Auto slide every 30 seconds
  useEffect(() => {
    const interval = setInterval(handleNext, 30000); // 30 seconds interval
    return () => clearInterval(interval); // Clear interval on component unmount
  }, [currentIndex]); // Re-run the effect when currentIndex changes

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000, // Animate from right (next) or left (prev)
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000, // Animate to left or right on exit
        opacity: 0,
      };
    },
  };

  return (
    <section className="w-full mx-auto h-[40hv]">
      <div
        className="relative w-full h-full"
        role="region"
        aria-roledescription="carousel"
        style={{ height: "200px" }} // Ensure there's height for the carousel
      >
        <div className="overflow-hidden relative h-full w-full">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="absolute top-0 left-0 right-0"
              style={{
                height: "100%", // Make sure the motion div takes full height
              }}
            >
              <Image
                alt={`Carousel Image ${currentIndex + 1}`}
                loading="lazy"
                width="600"
                height="200"
                decoding="async"
                className="h-full w-full object-cover"
                src={images[currentIndex]}
                style={{ aspectRatio: "600 / 200" }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="inline-flex items-center justify-center text-sm font-medium border border-input h-8 w-8 absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/50 p-2 shadow transition-colors hover:bg-white z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-left h-4 w-4"
          >
            <path d="M12 19L5 12l7-7" />
          </svg>
          <span className="sr-only">Previous slide</span>
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="inline-flex items-center justify-center text-sm font-medium border border-input h-8 w-8 absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/50 p-2 shadow transition-colors hover:bg-white z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-right h-4 w-4"
          >
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
          <span className="sr-only">Next slide</span>
        </button>
      </div>
    </section>
  );
};

export default Carousel;
