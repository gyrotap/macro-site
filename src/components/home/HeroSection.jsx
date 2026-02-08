import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import DraggableWindow from "@/components/DraggableWindow";

export default function HeroSection({ featuredPhoto }) {
  return (
    <section className="min-h-[80vh] w-full px-4 py-12 md:py-20">
      <div className="max-w-6xl mx-auto">
        {/* Main window */}
        <DraggableWindow>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="border-4 border-white window-border"
          >
            {/* Title bar */}
            <div className="window-titlebar bg-white text-black px-3 py-2 border-b-2 border-black flex items-center justify-between cursor-grab active:cursor-grabbing">
              <span className="text-sm">MACRO_PHOTOGRAPHY.EXE</span>
            <div className="flex gap-1">
              <div className="w-4 h-4 border-2 border-black bg-gray-300" />
              <div className="w-4 h-4 border-2 border-black bg-gray-300" />
              <div className="w-4 h-4 border-2 border-black bg-gray-300" />
            </div>
          </div>

          {/* Content */}
          <div className="bg-black p-6 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <p className="text-sm text-gray-500 mb-4">SYSTEM.INIT</p>
                  <h1 className="text-2xl md:text-4xl mb-6 leading-relaxed">
                    EXPLORING
                    <br />
                    THE SMALL WORLD
                    <br />
                    <span className="text-gray-600">OF MACRO PHOTOGRAPHY</span>
                  </h1>
                  <p className="text-sm text-gray-400 mb-8 leading-relaxed max-w-md">
                    Quod vis, quod invenis.
                  </p>
                  <Link
                    to={createPageUrl("Gallery")}
                    className="inline-block px-6 py-3 bg-white text-black border-2 border-white hover:bg-black hover:text-white transition-all text-sm"
                  >
                    [ENTER GALLERY]
                  </Link>
                </motion.div>
              </div>

              {featuredPhoto && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="border-2 border-white"
                >
                  <img
                    src={featuredPhoto.image_url}
                    alt={featuredPhoto.title}
                    className="w-full aspect-square object-cover"
                    style={{ imageRendering: "auto" }}
                  />
                  <div className="bg-white text-black p-2 border-t-2 border-black text-sm">
                    {featuredPhoto.title.toUpperCase()}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Status bar */}
          <div className="bg-white text-black px-3 py-1 border-t-2 border-black flex items-center justify-between text-sm">
            <span>READY</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 border border-black animate-pulse" />
              ONLINE
            </span>
          </div>
        </motion.div>
        </DraggableWindow>
      </div>
    </section>
  );
}