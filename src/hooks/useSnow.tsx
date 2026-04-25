import { useEffect, useRef } from 'react';

interface Flake {
  x: number;
  y: number;
  r: number;
  v: number;
  o: number;
  drift: number;
  driftOffset: number;
}

export function useSnow(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const flakesRef = useRef<Flake[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    function init() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width;
      canvas!.height = height;
      flakesRef.current = Array.from({ length: 80 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2.5 + 1,
        v: Math.random() * 0.8 + 0.3,
        o: Math.random() * 0.4 + 0.2,
        drift: Math.random() * 0.6 - 0.3,
        driftOffset: Math.random() * Math.PI * 2,
      }));
    }

    let tick = 0;

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      tick += 0.02;
      for (const f of flakesRef.current) {
        ctx!.fillStyle = `rgba(255, 255, 255, ${f.o})`;
        ctx!.beginPath();
        ctx!.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx!.fill();
        f.y += f.v;
        f.x += Math.sin(tick + f.driftOffset) * f.drift;
        if (f.y > height) f.y = -5;
        if (f.x > width) f.x = 0;
        if (f.x < 0) f.x = width;
      }
      rafRef.current = requestAnimationFrame(draw);
    }

    init();
    draw();

    window.addEventListener('resize', init);
    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(rafRef.current);
    };
  }, [canvasRef]);
}