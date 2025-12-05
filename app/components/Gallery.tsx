import React from 'react';
import { XMarkIcon } from "@heroicons/react/24/solid";

// Updated gallery images with proper unique files
const galleryImages = [
  { id: 1, src: '/gallery/gall1.jpg', alt: 'Mysterious castle entrance in fog' },
  { id: 2, src: '/gallery/gall2.jpg', alt: 'Planet Saturn with rings in deep space' },
  { id: 3, src: '/gallery/gall3.jpg', alt: 'Cryptocurrency coins on a stock chart' },
  { id: 4, src: '/gallery/gall4.jpg', alt: 'WALL-E holding a small green sprout' },
  { id: 5, src: '/gallery/gall5.jpg', alt: 'Fantasy scene placeholder' },
  { id: 6, src: '/gallery/gall6.jpg', alt: 'Batman figure standing in a dark alley' },
];

/**
 * Fullscreen Modal Component.
 */
const ImageModal = ({
  image,
  onClose,
}: {
  image: { src: string; alt: string };
  onClose: () => void;
}) => {

  React.useEffect(() => {
    const handleEscape = (e: any) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!image.src) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full max-h-full p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button with Heroicon */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 z-50 p-3 rounded-full bg-amber-500 text-zinc-950 hover:bg-amber-600 transition shadow-lg"
          aria-label="Close Viewer"
        >
          <XMarkIcon className="w-7 h-7 font-bold" />
        </button>

        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-auto max-h-[90vh] object-contain rounded-xl shadow-2xl border-2 border-amber-500/50"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "https://placehold.co/1000x600/18181b/ffffff?text=Image+Not+Found";
          }}
        />

        <p className="mt-4 text-center text-gray-300 text-sm italic">
          {image.alt}
        </p>
      </div>
    </div>
  );
};

/**
 * Image Card
 */
const ImageCard = ({
  src,
  alt,
  onClick,
}: {
  src: string;
  alt: string;
  onClick: () => void;
}) => {
  return (
    <div
      className="group relative overflow-hidden rounded-lg shadow-xl cursor-pointer transition-all duration-500"
      onClick={onClick}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover aspect-[3/2] group-hover:scale-105 group-hover:brightness-75 transition duration-500"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src =
            "https://placehold.co/600x400/18181b/ffffff?text=Image+Not+Found";
        }}
      />

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-500 flex items-center justify-center">
        <span className="text-white text-xl font-bold opacity-0 group-hover:opacity-100">
          Click to View
        </span>
      </div>
    </div>
  );
};

/**
 * Main Gallery
 */
const GalleryPage = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState({
    src: "",
    alt: "",
  });

  const openModal = (image: { src: string; alt: string }) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage({ src: "", alt: "" });
  };

  return (
    <div className="min-h-screen text-gray-100 p-8 sm:p-12 md:p-16 bg-green-1000/10 ">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-amber-500 font-semibold mb-2">
            Gallery
          </p>
          <h1 className="text-6xl md:text-7xl font-serif tracking-tight text-white mb-4 italic">
            WORLD OF <span className="text-amber-500">VELORA</span>
          </h1>
          <div className="w-16 h-0.5 bg-amber-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Witness the breathtaking landscapes and epic moments that await you
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {galleryImages.map((image) => (
            <ImageCard
              key={image.id}
              src={image.src}
              alt={image.alt}
              onClick={() => openModal(image)}
            />
          ))}
        </div>
      </div>

      {isModalOpen && (
        <ImageModal image={selectedImage} onClose={closeModal} />
      )}
    </div>
  );
};

const App = () => <GalleryPage />;

export default App;
