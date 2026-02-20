import React, { useState } from "react";
import { motion } from "framer-motion";
import PhotoLightbox from "../gallery/PhotoLightbox";
import { optimizedUrl } from "@/utils/imageUrl";

export default function FeaturedGrid({ photos }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  if (!photos.length) return null;

  return (
    <section className="px-4 md:px-8 pb-24 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <p className="text-xs tracking-widest text-muted-foreground uppercase">Selected Works</p>
      </motion.div>

      <div className="columns-1 md:columns-2 gap-4 md:gap-5">
        {photos.slice(0, 6).map((photo, idx) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="group relative cursor-pointer break-inside-avoid mb-4 md:mb-5 rounded overflow-hidden neu-raised"
            onClick={() => setSelectedPhoto(photo)}
          >
            <img
              src={optimizedUrl(photo.image_url)}
              alt={photo.title}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-background/0 group-hover:bg-background/50 transition-all duration-400 flex items-end">
              <div className="p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                <p className="text-sm text-foreground italic">{photo.title}</p>
                {photo.category && (
                  <p className="text-xs text-primary/70 mt-0.5 tracking-wider">{photo.category.replace(/_/g, " ")}</p>
                )}
              </div>
            </div>
          </motion.div>
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
    </section>
  );
}
