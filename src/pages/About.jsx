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
            className="border border-border bg-background"
          >
            {/* Terminal header bar */}
            <div className="window-titlebar bg-background border-b border-border px-4 py-2 cursor-grab active:cursor-grabbing">
              <span className="text-sm text-primary">ABOUT.TXT</span>
            </div>

            {/* Content */}
            <div className="bg-background p-8 md:p-12">
              <p className="text-xs text-muted-foreground mb-6">FILE INFO</p>

              <h1 className="text-3xl md:text-4xl mb-8 text-primary">
                MACRO
                <br />
                <span className="text-muted-foreground">VISION</span>
              </h1>

              <div className="space-y-6 text-base leading-relaxed text-foreground/90 mb-12">
                <p>
                  THIS COLLECTION EXPLORES THE WORLD OF SMALL
                  THROUGH THE LENS OF MY CAMERA. EACH IMAGE
                  CAPTURES THE INTRICATE DETAILS
                  OF SUBJECTS TOO SMALL FOR THE NAKED EYE.
                </p>
                <p>
                  FROM THE DELICATE STRUCTURE OF INSECT WINGS TO
                  THE GEOMETRIC PATTERNS OF CRYSTALS, MACRO
                  PHOTOGRAPHY REVEALS A UNIVERSE OF COMPLEXITY
                  EXISTING AT THE SMALLEST SCALES.
                </p>
                <p className="text-accent italic">
                  "GREAT THINGS ARE DONE BY A SERIES OF SMALL THINGS BROUGHT TOGETHER." - VINCENT VAN GOGH
                </p>
              </div>

              <div className="border border-border p-6 bg-background">
                <p className="text-xs text-muted-foreground mb-4">SYSTEM SPECS</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-2">Equipment:</p>
                    <p className="text-primary">SONY A7II w/ MACRO LENS</p>
                    <p className="text-primary">EXTENSION TUBES</p>
                    <p className="text-primary">FOCUS RAIL</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-2">Techniques:</p>
                    <p className="text-primary">FOCUS STACKING</p>
                    <p className="text-primary">HIGH MAG RATIOS</p>
                    <p className="text-primary">DIFFUSED LIGHTING</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Terminal footer bar */}
            <div className="bg-background border-t border-border px-4 py-1.5 text-xs flex justify-between text-muted-foreground">
              <span>EOF</span>
              <span>v1.0.0</span>
            </div>
          </motion.div>
        </DraggableWindow>
      </div>
    </div>
  );
}