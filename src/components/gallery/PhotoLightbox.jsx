import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PhotoLightbox({ photo, photos, onClose, onNavigate }) {
  const currentIndex = photos.findIndex((p) => p.id === photo.id);

  const goNext = (e) => {
    e?.stopPropagation();
    if (currentIndex < photos.length - 1) onNavigate(photos[currentIndex + 1]);
  };

  const goPrev = (e) => {
    e?.stopPropagation();
    if (currentIndex > 0) onNavigate(photos[currentIndex - 1]);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [currentIndex]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black flex flex-col"
        onClick={onClose}
      >
        {/* Window frame */}
        <div className="flex-1 p-4 md:p-8" onClick={(e) => e.stopPropagation()}>
          <div className="h-full border-4 border-white flex flex-col window-border">
            {/* Title bar */}
            <div className="bg-white text-black px-3 py-2 flex items-center justify-between border-b-2 border-black">
              <div className="text-sm flex-1">
                {photo.title.toUpperCase()} — [{currentIndex + 1}/{photos.length}]
              </div>
              <button
                onClick={onClose}
                className="w-4 h-4 border-2 border-black bg-gray-300 flex items-center justify-center hover:bg-gray-400 text-base"
              >
                ×
              </button>
            </div>

            {/* Content area */}
            <div className="flex-1 bg-black relative flex items-center justify-center p-4">
              {currentIndex > 0 && (
                <button
                  onClick={goPrev}
                  className="absolute left-4 w-8 h-8 bg-white text-black border-2 border-black hover:bg-gray-300 flex items-center justify-center"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}

              <motion.img
                key={photo.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                src={photo.image_url}
                alt={photo.title}
                className="max-h-full max-w-full object-contain border-2 border-white"
                style={{ imageRendering: "auto" }}
              />

              {currentIndex < photos.length - 1 && (
                <button
                  onClick={goNext}
                  className="absolute right-4 w-8 h-8 bg-white text-black border-2 border-black hover:bg-gray-300 flex items-center justify-center"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Info bar */}
            <div className="bg-white text-black px-3 py-2 border-t-2 border-black">
              <div className="flex flex-wrap gap-4 text-sm">
                {photo.subject && <span>SUBJECT: {photo.subject}</span>}
                {photo.magnification && <span>MAG: {photo.magnification}</span>}
                {photo.category && <span>TYPE: {photo.category.toUpperCase().replace(/_/g, " ")}</span>}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}