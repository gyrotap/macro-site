import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Layout({ children, currentPageName }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", page: "Home" },
    { label: "Gallery", page: "Gallery" },
    { label: "About", page: "About" },
    { label: "Admin", page: "Admin" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-mono" style={{ imageRendering: "pixelated" }}>
      <style>{`
        * {
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
        }
      `}</style>

      {/* Top terminal header bar - simple DOS style */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background border-b border-border">
        <div className="flex items-center h-10 px-4 text-sm">
          <Link to={createPageUrl("Home")} className="px-3 py-1 hover:text-primary transition-colors">
            C:\MACRO>
          </Link>
          <div className="hidden md:flex items-center gap-1 ml-4">
            {navItems.map((item) => (
              <Link
                key={item.page}
                to={createPageUrl(item.page)}
                className={`px-3 py-1 transition-colors ${
                  currentPageName === item.page
                    ? "text-primary"
                    : "hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden ml-auto px-3 py-1 hover:text-primary transition-colors"
          >
            {menuOpen ? "X" : "≡"}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-30 bg-background flex flex-col items-center justify-center gap-8 text-base">
          {navItems.map((item) => (
            <Link
              key={item.page}
              to={createPageUrl(item.page)}
              onClick={() => setMenuOpen(false)}
              className="hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

      {/* Page content */}
      <main className="pt-10">
        {children}
      </main>

      {/* Footer - minimal DOS style */}
      <footer className="border-t border-border mt-20 py-6 px-4 bg-background">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm opacity-60">
          <p>(c) {new Date().getFullYear()} GYROTAP</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-primary cursor-pointer transition-colors">CONTACT</span>
          </div>
        </div>
      </footer>
    </div>
  );
}