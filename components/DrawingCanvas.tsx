import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef, useCallback } from 'react';
import { ClearIcon } from './icons';

export interface CanvasHandle {
  getImageData: () => string | undefined;
  clearCanvas: () => void;
}

const DrawingCanvas = forwardRef<CanvasHandle, {}>((props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const initializeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Set canvas size based on its container
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    if (!context) return;
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 8;
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    contextRef.current = context;
  }, []);

  useEffect(() => {
    initializeCanvas();
    window.addEventListener('resize', initializeCanvas);
    return () => {
        window.removeEventListener('resize', initializeCanvas);
    };
  }, [initializeCanvas]);
  
  const getCoords = (event: React.MouseEvent<HTMLCanvasElement>): { x: number; y: number } => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
    };
  };

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getCoords(event);
    contextRef.current?.beginPath();
    contextRef.current?.moveTo(x, y);
    setIsDrawing(true);
  };

  const stopDrawing = () => {
    contextRef.current?.closePath();
    setIsDrawing(false);
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const { x, y } = getCoords(event);
    contextRef.current?.lineTo(x, y);
    contextRef.current?.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if(canvas && context) {
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  useImperativeHandle(ref, () => ({
    getImageData: () => {
      return canvasRef.current?.toDataURL('image/png');
    },
    clearCanvas: clearCanvas,
  }));

  return (
    <div className="w-full h-80 flex flex-col relative">
       <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={draw}
          onMouseLeave={stopDrawing}
          className="w-full h-full bg-white rounded-lg cursor-crosshair"
        />
        <button 
          onClick={clearCanvas} 
          className="absolute top-2 right-2 flex items-center bg-gray-700 text-white py-1 px-3 rounded-md hover:bg-gray-600 transition-colors"
        >
          <ClearIcon className="mr-2"/>
          Clear
        </button>
    </div>
  );
});

export default DrawingCanvas;
