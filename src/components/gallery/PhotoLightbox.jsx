import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
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
        className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col pt-11"
        onClick={onClose}
      >
        <div className="flex-1 flex flex-col p-4 md:p-8 min-h-0" onClick={(e) => e.stopPropagation()}>
          {/* Neumorphic window */}
          <div className="flex-1 flex flex-col neu-raised rounded-lg overflow-hidden min-h-0">
            {/* Header */}
            <div className="flex-shrink-0 bg-card border-b border-border/40 px-5 py-2.5 flex items-center justify-between">
              <div className="text-sm flex-1 text-foreground truncate pr-4">
                <em className="text-primary">{photo.title}</em>
                <span className="text-muted-foreground ml-2 text-xs">— {currentIndex + 1}/{photos.length}</span>
              </div>
              <button
                onClick={onClose}
                className="flex-shrink-0 w-7 h-7 neu-btn rounded flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Image area */}
            <div className="flex-1 bg-card relative flex items-center justify-center p-4 min-h-0 overflow-hidden">
              {currentIndex > 0 && (
                <button
                  onClick={goPrev}
                  className="absolute left-4 z-10 w-10 h-10 neu-btn rounded flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
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
                className="max-h-full max-w-full object-contain rounded"
                style={{ display: "block" }}
              />

              {currentIndex < photos.length - 1 && (
                <button
                  onClick={goNext}
                  className="absolute right-4 z-10 w-10 h-10 neu-btn rounded flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Metadata footer */}
            <div className="flex-shrink-0 bg-card border-t border-border/40 px-5 py-3">
              <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
                {photo.subject && <span><span className="text-foreground/40 mr-1">Subject</span>{photo.subject}</span>}
                {photo.magnification && <span><span className="text-foreground/40 mr-1">Mag</span>{photo.magnification}</span>}
                {photo.category && <span><span className="text-foreground/40 mr-1">Type</span>{photo.category.replace(/_/g, " ")}</span>}
                {photo.camera && <span><span className="text-foreground/40 mr-1">Camera</span>{photo.camera}</span>}
                {photo.lens && <span><span className="text-foreground/40 mr-1">Lens</span>{photo.lens}</span>}
                {photo.focal_length && <span>{photo.focal_length}</span>}
                {photo.aperture && <span>{photo.aperture}</span>}
                {photo.shutter_speed && <span>{photo.shutter_speed}</span>}
                {photo.iso && <span>ISO {photo.iso}</span>}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
