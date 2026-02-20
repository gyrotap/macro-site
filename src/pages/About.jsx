import React from "react";
import { motion } from "framer-motion";
import HalftoneBackground from "@/components/HalftoneBackground";
import DraggableWindow from "@/components/DraggableWindow";

export default function About() {
  return (
    <div className="relative bg-background min-h-screen px-4 py-12">
      <HalftoneBackground />
      <div className="relative z-10 max-w-4xl mx-auto">
        <DraggableWindow>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="neu-raised rounded-lg overflow-hidden"
          >
            {/* Titlebar */}
            <div className="window-titlebar bg-card border-b border-border/40 px-5 py-2.5 cursor-grab active:cursor-grabbing flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary/60 block" />
              <span className="text-xs text-muted-foreground tracking-widest">ABOUT.TXT</span>
            </div>

            {/* Content */}
            <div className="bg-card p-8 md:p-12">
              <p className="text-xs text-muted-foreground mb-6 tracking-widest uppercase">About</p>

              <h1 className="text-3xl md:text-4xl mb-8 text-foreground font-light">
                Macro
                <br />
                <span className="text-primary">Vision</span>
              </h1>

              <div className="space-y-5 text-base leading-relaxed text-foreground/80 mb-12 max-w-prose">
                <p>
                  This collection explores the world of the small through the lens of a camera.
                  Each image captures the intricate details of subjects too easily overlooked by
                  the naked eye.
                </p>
                <p>
                  From the delicate structure of insect wings to the geometric patterns of
                  crystals, macro photography reveals a universe of complexity existing at
                  the smallest scales.
                </p>
                <p className="text-primary/80 italic">
                  "Great things are done by a series of small things brought together." — Vincent van Gogh
                </p>
              </div>

              <div className="neu-inset rounded-lg p-6">
                <p className="text-xs text-muted-foreground mb-5 tracking-widest uppercase">Equipment</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                  <div className="space-y-2">
                    <p className="text-muted-foreground text-xs tracking-wider mb-3">Camera & Optics</p>
                    <p className="text-foreground">Sony A7 II</p>
                    <p className="text-foreground">Sigma 50mm f/1.4 DG DN Art</p>
                    <p className="text-foreground">Extension tubes</p>
                    <p className="text-foreground">Focus rail</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-muted-foreground text-xs tracking-wider mb-3">Techniques</p>
                    <p className="text-foreground">Focus stacking</p>
                    <p className="text-foreground">High magnification ratios</p>
                    <p className="text-foreground">Diffused natural lighting</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer bar */}
            <div className="bg-card border-t border-border/40 px-5 py-1.5 flex justify-between text-xs text-muted-foreground">
              <span>EOF</span>
              <span>v1.0.0</span>
            </div>
          </motion.div>
        </DraggableWindow>
      </div>
    </div>
  );
}
