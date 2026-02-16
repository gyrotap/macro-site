import React, { useState } from "react";
import { motion } from "framer-motion";
import PhotoLightbox from "../gallery/PhotoLightbox";
import { optimizedUrl } from "@/utils/imageUrl";

export default function FeaturedGrid({ photos }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  if (!photos.length) return null;

  return (
    <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p
          className="text-base tracking-[0.4em] uppercase text-[#444] mb-12"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Selected Works
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {photos.slice(0, 6).map((photo, idx) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className={`group relative cursor-pointer overflow-hidden ${
              idx === 0 ? "md:col-span-2 md:aspect-[21/9]" : "aspect-[4/3]"
            }`}
            onClick={() => setSelectedPhoto(photo)}
          >
            <img
              src={optimizedUrl(photo.image_url)}
              alt={photo.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-end">
              <div className="p-6 md:p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <h3
                  className="text-lg tracking-[0.15em] uppercase text-white"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {photo.title}
                </h3>
                {photo.category && (
                  <p
                    className="text-base text-white/40 mt-1 tracking-wider uppercase"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {photo.category}
                  </p>
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