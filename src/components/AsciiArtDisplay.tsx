const AsciiArtDisplay = ({ art, className = "" }: { art: string[]; className?: string }) => {
  return (
    <div className={className}>
      <pre
        className="font-mono text-[10px] sm:text-xs md:text-[13px] whitespace-pre leading-[1.2] select-none ascii-sweep"
        aria-hidden="true"
      >
        {art.join("\n")}
      </pre>
    </div>
  );
};

export default AsciiArtDisplay;