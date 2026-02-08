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
    <div className="min-h-screen bg-black text-white font-mono" style={{ imageRendering: "pixelated" }}>
      <style>{`
        
        * {
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
        }

        body {
          background: #000 !important;
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><rect width="16" height="16" fill="white"/><rect x="1" y="1" width="14" height="14" fill="black"/><rect x="2" y="2" width="12" height="12" fill="white"/></svg>') 8 8, auto;
        }

        a, button {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M8,0 L16,8 L8,16 L0,8 Z" fill="white"/><path d="M8,2 L14,8 L8,14 L2,8 Z" fill="black"/></svg>') 8 8, pointer;
        }

        .pixel-border {
          box-shadow: 
            0 0 0 2px #fff,
            0 0 0 4px #000,
            0 0 0 6px #fff;
        }

        .window-border {
          border: 2px solid #fff;
          box-shadow: 
            inset 2px 2px 0 rgba(255,255,255,0.3),
            inset -2px -2px 0 rgba(0,0,0,0.5),
            2px 2px 0 rgba(255,255,255,0.2);
        }

        *::-webkit-scrollbar {
          width: 16px;
          background: #000;
        }
        *::-webkit-scrollbar-track {
          background: repeating-linear-gradient(
            45deg,
            #111,
            #111 2px,
            #000 2px,
            #000 4px
          );
        }
        *::-webkit-scrollbar-thumb {
          background: #fff;
          border: 2px solid #000;
        }
      `}</style>

      {/* Scanline effect */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-5" style={{
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 4px)'
      }} />

      {/* Top menu bar - Mac OS 9 style */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white text-black border-b-2 border-black">
        <div className="flex items-center h-8 px-2 text-sm">
          <Link to={createPageUrl("Home")} className="px-2 hover:bg-black hover:text-white transition-colors">
            MACRO.SYS
          </Link>
          <div className="hidden md:flex items-center gap-1 ml-4">
            {navItems.map((item) => (
              <Link
                key={item.page}
                to={createPageUrl(item.page)}
                className={`px-2 py-1 transition-colors ${
                  currentPageName === item.page
                    ? "bg-black text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden ml-auto px-2 hover:bg-black hover:text-white"
          >
            {menuOpen ? "X" : "≡"}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-30 bg-black flex flex-col items-center justify-center gap-8 text-base">
          {navItems.map((item) => (
            <Link
              key={item.page}
              to={createPageUrl(item.page)}
              onClick={() => setMenuOpen(false)}
              className="hover:text-gray-400"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

      {/* Page content */}
      <main className="pt-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-white mt-20 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>© {new Date().getFullYear()} — gyrotap </p>
          <div className="flex items-center gap-4">
            <span className="hover:text-gray-400 cursor-pointer">CONTACT</span>
          </div>
        </div>
      </footer>
    </div>
  );
}