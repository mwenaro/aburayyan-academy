'use client'
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog"; // Assuming shadcn Dialog
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  src: string;
  description: string;
  category: string;
}

interface GalleryComponentProps {
  images: GalleryImage[];
}

export const GalleryComponent = ({ images }: GalleryComponentProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  // Auto-cycle through images every 30 seconds
  useEffect(() => {
    if (isModalOpen) {
      const interval = setInterval(() => {
        handleNext();
      }, 30000); // 30 seconds

      return () => clearInterval(interval);
    }
  }, [isModalOpen, selectedIndex]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 p-4">
      {images.map((image, index) => (
        <motion.div
          key={index}
          className="relative group cursor-pointer overflow-hidden rounded-lg"
          whileHover={{ scale: 1.05 }}
          onClick={() => handleImageClick(index)}
        >
          <img
            src={image.src}
            alt={image.description}
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
            <p className="text-white font-semibold">{image.category}</p>
            <p className="text-white text-sm">{image.description}</p>
          </div>
        </motion.div>
      ))}

      {/* Modal for Carousel */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-3xl">
          <div className="relative">
            <img
              src={images[selectedIndex].src}
              alt={images[selectedIndex].description}
              className="w-full h-96 object-cover rounded-lg"
            />
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
              <button
                onClick={handlePrev}
                className="p-2 bg-white bg-opacity-75 rounded-full shadow-md hover:bg-opacity-100 transition"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <button
                onClick={handleNext}
                className="p-2 bg-white bg-opacity-75 rounded-full shadow-md hover:bg-opacity-100 transition"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

