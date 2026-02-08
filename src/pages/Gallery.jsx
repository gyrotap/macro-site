import React, { useState } from "react";
import { photoService } from "@/services/photoService";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import PhotoGrid from "../components/gallery/PhotoGrid";
import CategoryFilter from "../components/gallery/CategoryFilter";
import { Loader2 } from "lucide-react";
import HalftoneBackground from "@/components/HalftoneBackground";
import DraggableWindow from "@/components/DraggableWindow";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");

  const { data: photos = [], isLoading } = useQuery({
    queryKey: ["photos-gallery"],
    queryFn: () => photoService.getAllPhotos(100),
  });

  const availableCategories = [...new Set(photos.map((p) => p.category).filter(Boolean))];

  const filteredPhotos =
    activeCategory === "all"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  return (
    <div className="relative bg-black min-h-screen px-4 py-12">
      <HalftoneBackground />
      <div className="relative z-10 max-w-6xl mx-auto">
        <DraggableWindow>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="border-4 border-white window-border mb-8"
          >
            <div className="window-titlebar bg-white text-black px-3 py-2 border-b-2 border-black text-sm cursor-grab active:cursor-grabbing">
              GALLERY.DIR — {photos.length} FILES
            </div>
          <div className="bg-black p-6">
            <h1 className="text-3xl mb-6">COLLECTION</h1>
            {availableCategories.length > 0 && (
              <CategoryFilter
                active={activeCategory}
                onChange={setActiveCategory}
                availableCategories={availableCategories}
              />
            )}
          </div>
        </motion.div>
        </DraggableWindow>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-sm flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              LOADING...
            </div>
          </div>
        ) : filteredPhotos.length === 0 ? (
          <div className="border-4 border-white window-border">
            <div className="bg-white text-black px-3 py-2 border-b-2 border-black text-sm">
              ERROR.TXT
            </div>
            <div className="bg-black p-12 text-center text-sm text-gray-500">
              NO FILES FOUND
            </div>
          </div>
        ) : (
          <PhotoGrid photos={filteredPhotos} columns={3} />
        )}
      </div>
    </div>
  );
}