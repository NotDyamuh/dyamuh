import { useRef } from 'react';
import { useSnow } from '../hooks/useSnow';

export default function Snow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useSnow(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      id="snow"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}