import React from "react";
import { motion } from "framer-motion";
import HalftoneBackground from "@/components/HalftoneBackground";
import DraggableWindow from "@/components/DraggableWindow";

export default function About() {
  return (
    <div className="relative bg-black min-h-screen px-4 py-12">
      <HalftoneBackground />
      <div className="relative z-10 max-w-4xl mx-auto">
        <DraggableWindow>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="border-4 border-white window-border"
          >
            {/* Title bar */}
            <div className="window-titlebar bg-white text-black px-3 py-2 border-b-2 border-black flex items-center justify-between cursor-grab active:cursor-grabbing">
              <span className="text-sm">ABOUT.TXT — READ ONLY</span>
            <div className="flex gap-1">
              <div className="w-4 h-4 border-2 border-black bg-gray-300" />
            </div>
          </div>

          {/* Content */}
          <div className="bg-black p-8 md:p-12">
            <p className="text-sm text-gray-500 mb-6">FILE INFO</p>
            
            <h1 className="text-3xl md:text-4xl mb-8">
              MACRO
              <br />
              <span className="text-gray-600">VISION</span>
            </h1>

            <div className="space-y-6 text-base leading-relaxed text-gray-300 mb-12">
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
              <p>
                "GREAT THINGS ARE DONE BY A SERIES OF SMALL THINGS BROUGHT TOGETHER." - VINCENT VAN GOGH
              </p>
            </div>

            <div className="border-2 border-white p-6 bg-black/50">
              <p className="text-sm text-gray-500 mb-4">SYSTEM SPECS</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="text-gray-600 mb-1">EQUIPMENT:</p>
                  <p className="text-white">SONY A7II w/ MACRO LENS</p>
                  <p className="text-white">EXTENSION TUBES</p>
                  <p className="text-white">FOCUS RAIL</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">TECHNIQUES:</p>
                  <p className="text-white">FOCUS STACKING</p>
                  <p className="text-white">HIGH MAG RATIOS</p>
                  <p className="text-white">DIFFUSED LIGHTING</p>
                </div>
              </div>
            </div>
          </div>

          {/* Status bar */}
          <div className="bg-white text-black px-3 py-1 border-t-2 border-black text-sm flex justify-between">
            <span>EOF</span>
            <span>v1.0.0</span>
          </div>
        </motion.div>
        </DraggableWindow>
      </div>
    </div>
  );
}