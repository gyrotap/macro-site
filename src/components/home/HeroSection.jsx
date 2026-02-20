import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import DraggableWindow from "@/components/DraggableWindow";
import { optimizedUrl } from "@/utils/imageUrl";

export default function HeroSection({ featuredPhoto }) {
  return (
    <section className="min-h-[85vh] w-full px-4 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <DraggableWindow>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="neu-raised rounded-lg overflow-hidden"
          >
            {/* Titlebar */}
            <div className="window-titlebar bg-card border-b border-border/40 px-5 py-2.5 cursor-grab active:cursor-grabbing flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-primary/60 block" />
              <span className="font-pixel text-xs text-muted-foreground">MACRO.EXE</span>
            </div>

            {/* Content */}
            <div className="bg-card p-8 md:p-14">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <p className="font-pixel text-xs text-muted-foreground mb-5">SYSTEM.INIT</p>
                    <h1 className="text-3xl md:text-5xl mb-6 leading-snug text-foreground font-light">
                      Exploring
                      <br />
                      <span className="text-primary">the small world</span>
                      <br />
                      <span className="text-muted-foreground text-2xl md:text-3xl">of macro photography</span>
                    </h1>
                    <p className="text-sm text-muted-foreground mb-10 leading-relaxed max-w-sm italic">
                      Quod vis, quod invenis.
                    </p>
                    <Link
                      to={createPageUrl("Gallery")}
                      className="inline-block px-7 py-3 neu-btn rounded text-sm tracking-wider text-primary hover:text-foreground transition-colors"
                    >
                      Enter Gallery →
                    </Link>
                  </motion.div>
                </div>

                {featuredPhoto && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="neu-raised rounded overflow-hidden"
                  >
                    <img
                      src={optimizedUrl(featuredPhoto.image_url)}
                      alt={featuredPhoto.title}
                      className="w-full aspect-square object-cover"
                    />
                    <div className="bg-card px-4 py-2.5 text-xs text-muted-foreground tracking-wider">
                      <em className="text-foreground/80">{featuredPhoto.title}</em>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Footer bar */}
            <div className="bg-card border-t border-border/40 px-5 py-1.5 flex items-center justify-between">
              <span className="font-pixel text-xs text-muted-foreground">READY</span>
              <span className="font-pixel text-xs text-primary flex items-center gap-2">
                ● ONLINE
              </span>
            </div>
          </motion.div>
        </DraggableWindow>
      </div>
    </section>
  );
}
