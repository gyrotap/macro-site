import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import DraggableWindow from "@/components/DraggableWindow";
import { optimizedUrl } from "@/utils/imageUrl";

export default function HeroSection({ featuredPhoto }) {
  return (
    <section className="min-h-[80vh] w-full px-4 py-12 md:py-20">
      <div className="max-w-6xl mx-auto">
        {/* Main terminal window */}
        <DraggableWindow>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="border border-border bg-background"
          >
            {/* Terminal header */}
            <div className="window-titlebar bg-background border-b border-border px-4 py-2 cursor-grab active:cursor-grabbing">
              <span className="text-sm text-primary">MACRO.EXE</span>
            </div>

            {/* Content */}
            <div className="bg-background p-6 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <p className="text-xs text-muted-foreground mb-4">SYSTEM.INIT</p>
                    <h1 className="text-2xl md:text-4xl mb-6 leading-relaxed text-primary">
                      EXPLORING
                      <br />
                      THE SMALL WORLD
                      <br />
                      <span className="text-muted-foreground">OF MACRO PHOTOGRAPHY</span>
                    </h1>
                    <p className="text-sm text-foreground/80 mb-8 leading-relaxed max-w-md italic">
                      Quod vis, quod invenis.
                    </p>
                    <Link
                      to={createPageUrl("Gallery")}
                      className="inline-block px-6 py-3 bg-background text-primary border border-primary hover:bg-primary hover:text-background transition-all text-sm"
                    >
                      ENTER GALLERY
                    </Link>
                  </motion.div>
                </div>

                {featuredPhoto && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="border border-border"
                  >
                    <img
                      src={optimizedUrl(featuredPhoto.image_url)}
                      alt={featuredPhoto.title}
                      className="w-full aspect-square object-cover"
                      style={{ imageRendering: "auto" }}
                    />
                    <div className="bg-background border-t border-border p-2 text-sm text-primary">
                      {featuredPhoto.title.toUpperCase()}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Terminal footer */}
            <div className="bg-background border-t border-border px-4 py-1.5 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">READY</span>
              <span className="flex items-center gap-2 text-primary">
                <span className="w-1.5 h-1.5 bg-primary animate-pulse" />
                ONLINE
              </span>
            </div>
          </motion.div>
        </DraggableWindow>
      </div>
    </section>
  );
}