import React, { useState, useMemo } from "react";
import { photoService } from "@/services/photoService";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import PhotoGrid from "../components/gallery/PhotoGrid";
import CategoryFilter from "../components/gallery/CategoryFilter";
import { Loader2 } from "lucide-react";
import HalftoneBackground from "@/components/HalftoneBackground";
import DraggableWindow from "@/components/DraggableWindow";

const SORT_OPTIONS = [
  { value: "sort_order", label: "Default" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "megapixels", label: "Resolution ↓" },
  { value: "title", label: "A → Z" },
];

function sortPhotos(photos, sortBy) {
  const arr = [...photos];
  switch (sortBy) {
    case "newest":
      return arr.sort((a, b) => {
        const ay = parseInt(a.date_taken_year || 0) * 100 + parseInt(a.date_taken_month || 0);
        const by = parseInt(b.date_taken_year || 0) * 100 + parseInt(b.date_taken_month || 0);
        return by - ay;
      });
    case "oldest":
      return arr.sort((a, b) => {
        const ay = parseInt(a.date_taken_year || 0) * 100 + parseInt(a.date_taken_month || 0);
        const by = parseInt(b.date_taken_year || 0) * 100 + parseInt(b.date_taken_month || 0);
        return ay - by;
      });
    case "megapixels":
      return arr.sort((a, b) => (parseFloat(b.megapixels) || 0) - (parseFloat(a.megapixels) || 0));
    case "title":
      return arr.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    default:
      return arr.sort((a, b) => (a.sort_order ?? 999) - (b.sort_order ?? 999));
  }
}

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSort, setActiveSort] = useState("sort_order");

  const { data: photos = [], isLoading } = useQuery({
    queryKey: ["photos-gallery"],
    queryFn: () => photoService.getAllPhotos(100),
  });

  const availableCategories = [...new Set(photos.map((p) => p.category).filter(Boolean))];

  const filteredPhotos = useMemo(() => {
    const filtered = activeCategory === "all"
      ? photos
      : photos.filter((p) => p.category === activeCategory);
    return sortPhotos(filtered, activeSort);
  }, [photos, activeCategory, activeSort]);

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
              <span className="text-xs text-muted-foreground/50 ml-auto">{filteredPhotos.length}/{photos.length} files</span>
            </div>
            <div className="bg-card p-6 space-y-4">
              <h1 className="text-2xl text-foreground font-light tracking-wider">Collection</h1>

              {/* Category filter */}
              {availableCategories.length > 0 && (
                <div>
                  <p className="font-pixel text-xs text-muted-foreground/50 mb-2">// FILTER</p>
                  <CategoryFilter
                    active={activeCategory}
                    onChange={setActiveCategory}
                    availableCategories={availableCategories}
                  />
                </div>
              )}

              {/* Sort options */}
              <div>
                <p className="font-pixel text-xs text-muted-foreground/50 mb-2">// SORT</p>
                <div className="flex flex-wrap gap-2">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setActiveSort(opt.value)}
                      className={`px-4 py-1.5 text-xs tracking-wider rounded transition-all ${
                        activeSort === opt.value
                          ? "neu-inset text-primary"
                          : "neu-btn text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
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
