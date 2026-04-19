import type { AsciiChar } from "@/data/ascii-art";

interface AsciiArtDisplayProps {
  art: AsciiChar[][];
  className?: string;
}

const AsciiArtDisplay = ({ art, className = "" }: AsciiArtDisplayProps) => {
  return (
    <div className={className}>
      <pre
        className="font-mono text-[10px] sm:text-xs md:text-[13px] whitespace-pre leading-[1.2] select-none"
        aria-hidden="true"
      >
        {art.map((row, rowIdx) => (
          <div key={rowIdx}>
            {row.map((cell, colIdx) => {
              if (cell.layer === "space") {
                return <span key={colIdx}>{cell.char}</span>;
              }
              if (cell.layer === "planet") {
                return (
                  <span key={colIdx} className="text-foreground/90 planet-glow">
                    {cell.char}
                  </span>
                );
              }
              return (
                <span
                  key={colIdx}
                  className="ring-animate"
                  style={{
                    animationDelay: `${colIdx * 35}ms`,
                  }}
                >
                  {cell.char}
                </span>
              );
            })}
          </div>
        ))}
      </pre>
    </div>
  );
};

export default AsciiArtDisplay;