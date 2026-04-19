import { useState } from "react";
import TerminalCore from "./TerminalCore";
import { TerminalProvider } from "./TerminalContext";

const GlobalTerminal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TerminalProvider>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 flex items-center justify-center font-mono text-lg"
          aria-label="Open terminal"
        >
          &gt;_
        </button>
      ) : (
        <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:w-[480px] rounded-t-lg sm:rounded-lg border border-border bg-card shadow-2xl flex flex-col" style={{ maxHeight: "50vh" }}>
          <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted/30">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-destructive/80 cursor-pointer" onClick={() => setIsOpen(false)} />
              <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <span className="w-3 h-3 rounded-full bg-green-400/80" />
            </div>
            <span className="text-xs text-muted-foreground font-mono">~/andrew-girgis</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              aria-label="Close terminal"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-hidden p-4">
            <TerminalCore promptLabel="$" />
          </div>
        </div>
      )}
    </TerminalProvider>
  );
};

export default GlobalTerminal;