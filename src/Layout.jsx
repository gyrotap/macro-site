import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Layout({ children, currentPageName }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", page: "Home" },
    { label: "Gallery", page: "Gallery" },
    { label: "About", page: "About" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Geist Mono', monospace" }}>
      {/* Top nav — neumorphic raised bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-card neu-raised border-b border-border/40">
        <div className="flex items-center h-11 px-6 text-sm">
          <Link
            to={createPageUrl("Home")}
            className="text-primary font-semibold tracking-widest hover:opacity-80 transition-opacity mr-8"
          >
            MACRO.PICTURES
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.page}
                to={createPageUrl(item.page)}
                className={`px-4 py-1.5 rounded transition-all text-xs tracking-wider ${
                  currentPageName === item.page
                    ? "text-primary neu-inset"
                    : "text-muted-foreground hover:text-foreground neu-btn"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden ml-auto px-3 py-1 neu-btn rounded text-muted-foreground hover:text-foreground transition-colors"
          >
            {menuOpen ? "✕" : "≡"}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-30 bg-background/95 flex flex-col items-center justify-center gap-8 text-base backdrop-blur-sm">
          {navItems.map((item) => (
            <Link
              key={item.page}
              to={createPageUrl(item.page)}
              onClick={() => setMenuOpen(false)}
              className="text-muted-foreground hover:text-primary transition-colors tracking-widest text-sm"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

      {/* Page content */}
      <main className="pt-11">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-20 py-8 px-6 bg-card">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground tracking-wider">
          <p>© {new Date().getFullYear()} GYROTAP — MACRO PHOTOGRAPHY</p>
          <div className="flex items-center gap-6">
            <Link to={createPageUrl("Gallery")} className="hover:text-primary transition-colors">Gallery</Link>
            <Link to={createPageUrl("About")} className="hover:text-primary transition-colors">About</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
