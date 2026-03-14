import { useEffect, useState, useRef, useCallback } from "react";

const AsciiSkyline = () => {
  const [html, setHtml] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [containerHeight, setContainerHeight] = useState<number | undefined>();

  useEffect(() => {
    fetch("/ascii-skyline.html")
      .then((r) => r.text())
      .then(setHtml)
      .catch(() => {});
  }, []);

  const updateScale = useCallback(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const pre = content.querySelector("pre");
    if (!pre) return;

    const intrinsicWidth = pre.scrollWidth;
    const availableWidth = container.clientWidth;

    if (intrinsicWidth > 0) {
      const newScale = availableWidth / intrinsicWidth;
      setScale(newScale);
      setContainerHeight(content.scrollHeight * newScale);
    }
  }, []);

  useEffect(() => {
    if (!html) return;
    requestAnimationFrame(updateScale);

    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [html, updateScale]);

  if (!html) return null;

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden relative"
      style={{ height: containerHeight }}
    >
      <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-surface-alt to-transparent z-10 pointer-events-none" />
      <div
        ref={contentRef}
        className="ascii-skyline-container"
        style={{
          transformOrigin: "top left",
          transform: `scale(${scale})`,
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

export default AsciiSkyline;
