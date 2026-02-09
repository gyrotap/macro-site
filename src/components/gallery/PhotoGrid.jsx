import React, { useState } from "react";
import { motion } from "framer-motion";
import PhotoLightbox from "./PhotoLightbox";

export default function PhotoGrid({ photos, columns = 3 }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const responsiveColumns = typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 
                            typeof window !== "undefined" && window.innerWidth < 1024 ? 2 : columns;

  const colData = (() => {
    const cols = Array.from({ length: responsiveColumns }, () => []);
    photos.forEach((photo, i) => {
      cols[i % responsiveColumns].push(photo);
    });
    return cols;
  })();

  return (
    <>
      <div className="flex gap-4">
        {colData.map((col, colIdx) => (
          <div key={colIdx} className="flex-1 flex flex-col gap-4">
            {col.map((photo, idx) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="relative cursor-pointer group"
                onClick={() => setSelectedPhoto(photo)}
                onMouseEnter={() => setHoveredId(photo.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className={`border border-border transition-all ${
                  hoveredId === photo.id ? "border-primary" : ""
                }`}>
                  <img
                    src={photo.image_url}
                    alt={photo.title}
                    className="w-full object-cover"
                    style={{ imageRendering: "auto" }}
                    loading="lazy"
                  />
                  {hoveredId === photo.id && (
                    <div className="absolute bottom-0 left-0 right-0 bg-background border-t border-border p-2">
                      <div className="text-sm text-primary">
                        {photo.title.toUpperCase()}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <PhotoLightbox
          photo={selectedPhoto}
          photos={photos}
          onClose={() => setSelectedPhoto(null)}
          onNavigate={setSelectedPhoto}
        />
      )}
    </>
  );
}