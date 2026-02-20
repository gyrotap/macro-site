import React, { useEffect, useRef } from 'react';

export default function HalftoneBackground() {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Dot grid parameters
    const gridSize = 22;
    const maxDotSize = 2.8;

    // Two overlapping wave systems — different frequencies and directions
    // creates a slow, organic interference pattern
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.008;

      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          // Primary wave — diagonal
          const wave1 = Math.sin(x * 0.012 + y * 0.008 + time);
          // Secondary wave — counter-diagonal, slower
          const wave2 = Math.sin(x * 0.006 - y * 0.010 + time * 0.7);
          // Combine: interference between the two
          const combined = (wave1 + wave2) * 0.5; // range -1 to 1

          // Map to dot size: only show dots when combined is positive
          const t = (combined + 1) / 2; // 0 to 1
          const dotSize = maxDotSize * Math.pow(t, 1.6);

          if (dotSize < 0.3) continue;

          // Sage green tinted dots — warm side stays muted
          const opacity = 0.04 + t * 0.08;
          ctx.fillStyle = `rgba(122, 158, 126, ${opacity})`;

          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[5]"
    />
  );
}
