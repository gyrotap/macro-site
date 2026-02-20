import React from "react";

const categories = [
  { value: "all", label: "ALL" },
  { value: "insects", label: "INSECTS" },
  { value: "arachnids", label: "ARACHNIDS" },
  { value: "plants", label: "PLANTS" },
  { value: "flowers", label: "FLOWERS" },
  { value: "fungi", label: "FUNGI" },
  { value: "minerals", label: "MINERALS" },
  { value: "water_drops", label: "WATER DROPS" },
  { value: "textures", label: "TEXTURES" },
  { value: "eyes", label: "EYES" },
  { value: "scales", label: "SCALES" },
];

export default function CategoryFilter({ active, onChange, availableCategories }) {
  const filtered = categories.filter(
    (c) => c.value === "all" || availableCategories.includes(c.value)
  );

  return (
    <div className="flex flex-wrap gap-2">
      {filtered.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className={`px-4 py-2 text-sm border border-border transition-all ${
            active === cat.value
              ? "bg-background text-primary border-primary"
              : "bg-background text-foreground hover:text-primary hover:border-primary"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}