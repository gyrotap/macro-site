import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HalftoneBackground from "@/components/HalftoneBackground";
import DraggableWindow from "@/components/DraggableWindow";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check credentials against environment variables
    const validUsername = import.meta.env.VITE_ADMIN_USERNAME;
    const validPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (username === validUsername && password === validPassword) {
      // Set session token
      sessionStorage.setItem("admin_authenticated", "true");
      navigate("/admin");
    } else {
      setError("Invalid credentials");
      setPassword("");
    }
  };

  return (
    <div className="relative bg-background min-h-screen px-4 py-12 flex items-center justify-center">
      <HalftoneBackground />
      <div className="relative z-10 w-full max-w-md">
        <DraggableWindow>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="border border-border bg-background"
          >
            {/* Terminal header */}
            <div className="window-titlebar bg-background border-b border-border px-4 py-2 cursor-grab active:cursor-grabbing">
              <span className="text-sm text-primary">LOGIN.EXE</span>
            </div>

            {/* Content */}
            <div className="bg-background p-8">
              <p className="text-xs text-muted-foreground mb-6">AUTHENTICATION REQUIRED</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-xs text-muted-foreground mb-2 block">USERNAME</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-background border border-border px-4 py-2 text-foreground focus:border-primary focus:outline-none"
                    placeholder="Enter username"
                    autoComplete="username"
                  />
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-2 block">PASSWORD</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-background border border-border px-4 py-2 text-foreground focus:border-primary focus:outline-none"
                    placeholder="Enter password"
                    autoComplete="current-password"
                  />
                </div>

                {error && (
                  <div className="border border-destructive px-4 py-2 text-sm text-destructive">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-background text-primary border border-primary hover:bg-primary hover:text-background transition-all text-sm"
                >
                  ACCESS ADMIN
                </button>
              </form>
            </div>

            {/* Terminal footer */}
            <div className="bg-background border-t border-border px-4 py-1.5 text-xs text-muted-foreground">
              SECURED
            </div>
          </motion.div>
        </DraggableWindow>
      </div>
    </div>
  );
}
