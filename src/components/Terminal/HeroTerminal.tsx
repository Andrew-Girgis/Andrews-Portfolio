import TerminalCore from "./TerminalCore";

const HeroTerminal = () => {
  return (
    <div className="w-full max-w-md md:max-w-lg rounded-lg border border-border bg-card/50 backdrop-blur-sm overflow-hidden">
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border bg-muted/30">
        <span className="w-3 h-3 rounded-full bg-destructive/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
        <span className="w-3 h-3 rounded-full bg-green-400/80" />
        <span className="ml-2 text-xs text-muted-foreground font-mono">
          ~/andrew-girgis
        </span>
      </div>
      <div className="p-4">
        <TerminalCore autoFocus promptLabel="$" />
      </div>
    </div>
  );
};

export default HeroTerminal;