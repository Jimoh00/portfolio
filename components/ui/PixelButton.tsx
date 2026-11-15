"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  pixelSize?: number;
  idleColor?: string;
  hoverColor?: string;
}

export const PixelButton: React.FC<PixelButtonProps> = ({
  children,
  pixelSize = 10,
  idleColor = 'bg-black',
  hoverColor = 'bg-lime-400',
  className,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [grid, setGrid] = useState({
    columns: 0,
    rows: 0,
    activePixels: [] as boolean[]
  });
  const buttonRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const updateGridDimensions = () => {
      const columns = Math.ceil(button.clientWidth / pixelSize) + 1;
      const rows = Math.ceil(button.clientHeight / pixelSize) + 1;

      setGrid(current =>
        current.columns === columns && current.rows === rows
          ? current
          : {
              columns,
              rows,
              activePixels: new Array(columns * rows).fill(false)
            }
      );
    };

    const observer = new ResizeObserver(updateGridDimensions);
    observer.observe(button);

    return () => observer.disconnect();
  }, [pixelSize]);

  useEffect(() => {
    const totalPixels = grid.columns * grid.rows;
    if (totalPixels === 0) return;

    const indices = Array.from({ length: totalPixels }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    let nextIndex = 0;
    const clusterSize = Math.ceil(totalPixels * 0.1);
    const interval = setInterval(() => {
      if (nextIndex === totalPixels) {
        clearInterval(interval);
        return;
      }

      const startIndex = nextIndex;
      nextIndex = Math.min(nextIndex + clusterSize, totalPixels);

      setGrid(current => {
        const next = current.activePixels.length === totalPixels
          ? [...current.activePixels]
          : new Array(totalPixels).fill(false);

        for (let i = startIndex; i < nextIndex; i++) {
          next[indices[i]] = isHovered;
        }

        return { ...current, activePixels: next };
      });
    }, isHovered ? 40 : 30);

    return () => clearInterval(interval);
  }, [grid.columns, grid.rows, isHovered]);

  return (
    <button
      ref={buttonRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className={cn(
        'relative inline-flex items-center justify-center px-7 lg:py-5 py-0 border overflow-hidden group cursor-pointer transition-colors',
        isHovered ? 'border-black' : 'border-lime-400',
        className
      )}
      {...props}
    >
      {grid.activePixels.length > 0 && (
        <div
          className="absolute inset-0 grid pointer-events-none"
          style={{
            gridTemplateColumns: `repeat(${grid.columns}, ${pixelSize}px)`,
            gridTemplateRows: `repeat(${grid.rows}, ${pixelSize}px)`
          }}
        >
          {grid.activePixels.map((active, i) => (
            <div
              key={i}
              className={cn(
                'transition-colors duration-150',
                active ? hoverColor : idleColor
              )}
            />
          ))}
        </div>
      )}

      {/* Content Layer */}
      <span className={cn(
        'relative z-10 font-mono font-bold uppercase tracking-tighter transition-colors duration-300',
        isHovered ? 'text-black' : 'text-lime-400'
      )}>
        {children}
      </span>
    </button>
  );
};
