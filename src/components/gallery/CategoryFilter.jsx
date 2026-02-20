import React from "react";

const categories = [
  { value: "all", label: "All" },
  { value: "insects", label: "Insects" },
  { value: "arachnids", label: "Arachnids" },
  { value: "plants", label: "Plants" },
  { value: "flowers", label: "Flowers" },
  { value: "fungi", label: "Fungi" },
  { value: "minerals", label: "Minerals" },
  { value: "water_drops", label: "Water Drops" },
  { value: "textures", label: "Textures" },
  { value: "eyes", label: "Eyes" },
  { value: "scales", label: "Scales" },
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
          className={`px-4 py-1.5 text-xs tracking-wider rounded transition-all ${
            active === cat.value
              ? "neu-inset text-primary"
              : "neu-btn text-muted-foreground hover:text-foreground"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}