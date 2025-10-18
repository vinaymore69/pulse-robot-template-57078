import React, { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const EventGalleryModal = ({ event, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % event.gallery.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + event.gallery.length) % event.gallery.length);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between z-10">
        <div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-1">
            {event.title}
          </h2>
          <p className="text-white/70 text-sm">{event.category} Event - {event.date}</p>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-300"
        >
          <X className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Main Image */}
      <div 
        className="h-full w-full flex items-center justify-center p-4 sm:p-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative max-w-7xl w-full h-full flex items-center justify-center">
          <img 
            src={event.gallery[selectedImage]} 
            alt={`${event.title} - Image ${selectedImage + 1}`}
            className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
          />

          {/* Navigation Buttons */}
          {event.gallery.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium">
            {selectedImage + 1} / {event.gallery.length}
          </div>
        </div>
      </div>

      {/* Thumbnail Grid (Bento Grid) */}
      <div 
        className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 max-h-48 overflow-x-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex gap-3 justify-center">
          {event.gallery.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`
                relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden 
                transition-all duration-300 hover:scale-110
                ${selectedImage === index 
                  ? 'ring-4 ring-pulse-500 scale-110' 
                  : 'ring-2 ring-white/20 opacity-60 hover:opacity-100'
                }
              `}
            >
              <img 
                src={img} 
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventGalleryModal;