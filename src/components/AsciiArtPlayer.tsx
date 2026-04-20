import { useState, useEffect, useRef, useCallback } from "react";

interface AsciiArtPlayerProps {
  frames: string[];
  fps?: number;
  className?: string;
  size?: number | "fit";
}

const CHAR_WIDTH_RATIO = 0.602;

const AsciiArtPlayer = ({ frames, fps = 5, className = "", size = "fit" }: AsciiArtPlayerProps) => {
  const [frameIndex, setFrameIndex] = useState(0);
  const [fontSize, setFontSize] = useState<number | null>(null);
  const prefersReducedMotion = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const maxLineWidth = useRef(0);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion.current = mql.matches;

    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (frames.length === 0) return;
    const maxWidth = Math.max(...frames[0].split("\n").map((l) => l.length));
    maxLineWidth.current = maxWidth;
  }, [frames]);

  const updateFontSize = useCallback(() => {
    if (typeof size === "number") {
      setFontSize(size);
      return;
    }
    if (!containerRef.current || maxLineWidth.current === 0) return;
    const containerWidth = containerRef.current.clientWidth;
    const calculated = containerWidth / (maxLineWidth.current * CHAR_WIDTH_RATIO);
    const clamped = Math.min(72, Math.max(4, calculated));
    setFontSize(clamped);
  }, [size]);

  useEffect(() => {
    updateFontSize();

    if (typeof size === "number" || !containerRef.current) return;
    const observer = new ResizeObserver(() => {
      updateFontSize();
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [updateFontSize]);

  useEffect(() => {
    if (frames.length <= 1 || prefersReducedMotion.current) return;

    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % frames.length);
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, [frames.length, fps]);

  if (frames.length === 0 || fontSize === null) return (
    <div ref={containerRef} className={className} style={{ visibility: "hidden" }}>
      <pre className="font-mono whitespace-pre leading-[1.1] select-none" aria-hidden="true" style={{ fontSize: "4px" }}>
        {frames[0]}
      </pre>
    </div>
  );

  return (
    <div ref={containerRef} className={className}>
      <pre
        className="font-mono text-foreground ascii-sweep whitespace-pre leading-[1.1] select-none"
        style={{ fontSize: `${fontSize}px` }}
        aria-hidden="true"
      >
        {frames[prefersReducedMotion.current ? 0 : frameIndex]}
      </pre>
    </div>
  );
};

export default AsciiArtPlayer;