"use client";
import React from "react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Cinzel_Decorative } from "next/font/google";
 export const cinzel = Cinzel_Decorative({ subsets: ["latin"], weight: ["400", "700", "900"]});

// Optimized images
const galleryImages = [
  { id: 1, src: "/gallery/gall1.jpg", alt: "Mysterious castle entrance in fog", w: 1200, h: 800 },
  { id: 2, src: "/gallery/gall2.jpg", alt: "Planet Saturn with rings in deep space", w: 1200, h: 800 },
  { id: 3, src: "/gallery/gall3.jpg", alt: "Cryptocurrency coins on a stock chart", w: 1200, h: 800 },
  { id: 4, src: "/gallery/gall4.jpg", alt: "WALL-E holding a small green sprout", w: 1200, h: 800 },
  { id: 5, src: "/gallery/gall5.jpg", alt: "Fantasy scene placeholder", w: 1200, h: 800 },
  { id: 6, src: "/gallery/gall6.jpg", alt: "Batman standing in a dark alley", w: 1200, h: 800 },
];

/* -------------------------- MODAL -------------------------- */

const ImageModal = ({
  image,
  onClose,
}: {
  image: { src: string; alt: string; w?: number; h?: number };
  onClose: () => void;
}) => {
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!image.src) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-5 -right-5 sm:-top-7 sm:-right-7 z-50 p-3 rounded-full bg-amber-500 text-zinc-900 hover:bg-amber-600 transition shadow-lg"
          aria-label="Close Viewer"
        >
          <XMarkIcon className="w-7 h-7" />
        </button>

        {/* Optimized Image */}
        <Image
          src={image.src}
          alt={image.alt}
          width={image.w || 1200}
          height={image.h || 800}
          className="w-full h-auto max-h-[90vh] object-contain rounded-xl shadow-2xl border border-amber-500/40"
          priority={true}
        />

        <p className="mt-4 text-center text-gray-300 text-sm italic">{image.alt}</p>
      </div>
    </div>
  );
};

/* -------------------------- CARD -------------------------- */

const ImageCard = ({
  src,
  alt,
  w,
  h,
  onClick,
}: {
  src: string;
  alt: string;
  w: number;
  h: number;
  onClick: () => void;
}) => {
  return (
    <div
      className="group relative overflow-hidden rounded-lg shadow-xl cursor-pointer"
      onClick={onClick}
    >
      <Image
        src={src}
        alt={alt}
        width={w}
        height={h}
        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-500 flex items-center justify-center">
        <span className="text-white text-xl font-bold opacity-0 group-hover:opacity-100">
          Click to View
        </span>
      </div>
    </div>
  );
};

/* -------------------------- MAIN PAGE -------------------------- */

const GalleryPage = () => {

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState({
    src: "",
    alt: "",
    w: 0,
    h: 0,
  });

  const openModal = (image: any) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen text-gray-100 p-8 sm:p-12 md:p-16 bg-green-1000/10">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <header className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-amber-500 font-semibold mb-2">
            Gallery
          </p>

          <h1 className={`${cinzel.className} font-bold text-6xl md:text-7xl font-serif tracking-tight text-white mb-4 italic`}>
            WORLD OF <span className="text-amber-500">VELORA</span>
          </h1>

          <div className="w-16 h-0.5 bg-amber-500 mx-auto mb-6"></div>

          <p className={` text-lg text-gray-400 max-w-xl mx-auto`}>
            Witness the breathtaking landscapes and epic moments that await you
          </p>
        </header>

        {/* GALLERY GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {galleryImages.map((img) => (
            <ImageCard
              key={img.id}
              src={img.src}
              alt={img.alt}
              w={img.w}
              h={img.h}
              onClick={() => openModal(img)}
            />
          ))}
        </div>
      </div>

      {isModalOpen && (
        <ImageModal image={selectedImage} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default GalleryPage;
