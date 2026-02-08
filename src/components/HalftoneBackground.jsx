import React, { useEffect, useRef } from 'react';

export default function HalftoneBackground() {
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let time = 0;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse position
    const handleMouseMove = (e) => {
      mousePos.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Halftone dot parameters
    const gridSize = 18; // Space between dots (smaller = more dots)
    const maxDotSize = 3; // Maximum dot radius - subtle
    const waveSpeed = 0.015;
    const waveAmplitude = 0.2;
    const gravityRadius = 250; // Pixels - how far the cursor gravity reaches
    const gravityStrength = 40; // How much dots are pulled toward cursor

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += waveSpeed;

      const mouseX = mousePos.current.x * canvas.width;
      const mouseY = mousePos.current.y * canvas.height;

      // Draw halftone dots
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          // Calculate pixel distance from mouse
          const dx = x - mouseX;
          const dy = y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Gravity well effect - exponential falloff like real gravity
          const gravityFactor = Math.max(0, 1 - distance / gravityRadius);
          const gravity = Math.pow(gravityFactor, 2); // Exponential for stronger effect

          // Calculate displacement toward cursor (spacetime warping)
          const displacementX = -dx * gravity * (gravityStrength / distance);
          const displacementY = -dy * gravity * (gravityStrength / distance);

          // Apply displacement to dot position
          const warpedX = x + displacementX;
          const warpedY = y + displacementY;

          // Wave effect based on position and time (subtle background animation)
          const wave = Math.sin(x * 0.008 + y * 0.008 + time) * waveAmplitude;

          // Size scales subtly with gravity
          const baseSize = 0.4 + wave;
          const dotSize = maxDotSize * (baseSize + gravity * 0.7);

          // Opacity increases subtly near cursor
          const opacity = 0.12 + gravity * 0.25;

          // Color gets LIGHTER near cursor (glowing effect on black)
          const colorIntensity = Math.floor(80 + gravity * 30); // Light gray to brighter
          ctx.fillStyle = `rgba(${colorIntensity}, ${colorIntensity}, ${colorIntensity}, ${opacity})`;

          ctx.beginPath();
          ctx.arc(warpedX, warpedY, Math.max(0.5, dotSize), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[5]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
