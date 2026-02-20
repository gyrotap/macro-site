import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { optimizedUrl } from "@/utils/imageUrl";

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
        className="fixed inset-0 z-50 bg-background flex flex-col"
        onClick={onClose}
      >
        {/* Terminal window frame */}
        <div className="flex-1 flex flex-col p-4 md:p-8 min-h-0" onClick={(e) => e.stopPropagation()}>
          <div className="flex-1 flex flex-col border border-border bg-background min-h-0">
            {/* Terminal header */}
            <div className="flex-shrink-0 bg-background border-b border-border px-4 py-2 flex items-center justify-between">
              <div className="text-sm flex-1 text-primary truncate pr-4">
                <em>{photo.title}</em> — {currentIndex + 1}/{photos.length}
              </div>
              <button
                onClick={onClose}
                className="flex-shrink-0 w-6 h-6 border border-border bg-background flex items-center justify-center hover:text-primary text-base transition-colors"
              >
                ×
              </button>
            </div>

            {/* Content area — fills remaining space, image contained within */}
            <div className="flex-1 bg-background relative flex items-center justify-center p-4 min-h-0 overflow-hidden">
              {currentIndex > 0 && (
                <button
                  onClick={goPrev}
                  className="absolute left-4 z-10 w-10 h-10 bg-background border border-border hover:text-primary hover:border-primary flex items-center justify-center transition-colors text-primary"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              <motion.img
                key={photo.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                src={optimizedUrl(photo.image_url)}
                alt={photo.title}
                className="max-h-full max-w-full object-contain border border-border"
                style={{ imageRendering: "auto", display: "block" }}
              />

              {currentIndex < photos.length - 1 && (
                <button
                  onClick={goNext}
                  className="absolute right-4 z-10 w-10 h-10 bg-background border border-border hover:text-primary hover:border-primary flex items-center justify-center transition-colors text-primary"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Terminal info footer */}
            <div className="flex-shrink-0 bg-background border-t border-border px-4 py-2">
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                {photo.subject && <span className="text-primary">SUBJECT: {photo.subject}</span>}
                {photo.magnification && <span className="text-primary">MAG: {photo.magnification}</span>}
                {photo.category && <span className="text-primary">TYPE: {photo.category.toUpperCase().replace(/_/g, " ")}</span>}
                {photo.camera && <span className="text-primary">CAM: {photo.camera}</span>}
                {photo.lens && <span className="text-primary">LENS: {photo.lens}</span>}
                {photo.focal_length && <span className="text-primary">{photo.focal_length}</span>}
                {photo.aperture && <span className="text-primary">{photo.aperture}</span>}
                {photo.shutter_speed && <span className="text-primary">{photo.shutter_speed}</span>}
                {photo.iso && <span className="text-primary">ISO {photo.iso}</span>}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}