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
    <div className="relative bg-background min-h-screen px-4 py-12">
      <HalftoneBackground />
      <div className="relative z-10 max-w-6xl mx-auto">
        <DraggableWindow>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="neu-raised rounded-lg overflow-hidden mb-8"
          >
            <div className="window-titlebar bg-card border-b border-border/40 px-5 py-2.5 cursor-grab active:cursor-grabbing flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-primary/60 block" />
              <span className="font-pixel text-xs text-muted-foreground">GALLERY.DIR</span>
              <span className="text-xs text-muted-foreground/50 ml-auto">{photos.length} files</span>
            </div>
            <div className="bg-card p-6">
              <h1 className="text-2xl mb-5 text-foreground font-light tracking-wider">Collection</h1>
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
            <div className="text-sm flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading...
            </div>
          </div>
        ) : filteredPhotos.length === 0 ? (
          <div className="neu-raised rounded-lg p-12 text-center text-sm text-muted-foreground">
            No images found
          </div>
        ) : (
          <PhotoGrid photos={filteredPhotos} columns={3} />
        )}
      </div>
    </div>
  );
}
