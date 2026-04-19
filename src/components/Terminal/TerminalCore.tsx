import { useState, useRef, useEffect, useCallback } from "react";
import { useTerminal } from "./TerminalContext";

const TerminalCore = ({ className = "", autoFocus = false, promptLabel = "$" }: { className?: string; autoFocus?: boolean; promptLabel?: string }) => {
  const { lines, executeCommand, commandHistory, historyIndex, setHistoryIndex } = useTerminal();
  const [input, setInput] = useState("");
  const [isBooting, setIsBooting] = useState(true);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoFocus) {
      const timer = setTimeout(() => {
        const bootSequence = [
          "Connecting to ~/andrew-girgis...",
          "Authenticating... OK",
          "Loading modules: data-science, economics, ai... OK",
          "System ready.",
        ];
        setBootLines(bootSequence);
        setTimeout(() => setIsBooting(false), bootSequence.length * 400 + 500);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setIsBooting(false);
    }
  }, [autoFocus]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, bootLines]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim()) return;
      const cmd = input;
      setInput("");
      await executeCommand(cmd);
    },
    [input, executeCommand]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (commandHistory.length === 0) return;
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex === -1) return;
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      } else if (e.key === "l" && e.ctrlKey) {
        e.preventDefault();
      }
    },
    [commandHistory, historyIndex, setHistoryIndex]
  );

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className={`font-mono text-xs sm:text-sm ${className}`} onClick={handleContainerClick}>
      <div ref={scrollRef} className="overflow-y-auto overflow-x-hidden" style={{ maxHeight: "300px" }}>
        {isBooting && autoFocus ? (
          <div className="space-y-1">
            {bootLines.map((line, i) => (
              <div key={i} className="text-muted-foreground">
                {line}
              </div>
            ))}
          </div>
        ) : (
          <>
            {lines.map((line) => (
              <div
                key={line.id}
                className={`whitespace-pre-wrap break-words ${
                  line.type === "input"
                    ? "text-foreground"
                    : line.type === "error"
                      ? "text-destructive"
                      : line.type === "system"
                        ? "text-primary"
                        : "text-muted-foreground"
                }`}
              >
                {line.content}
              </div>
            ))}
          </>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-1 mt-1">
        <span className="text-accent">{promptLabel}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-foreground font-mono text-xs sm:text-sm caret-primary"
          autoComplete="off"
          spellCheck={false}
          aria-label="Terminal input"
        />
      </form>
    </div>
  );
};

export default TerminalCore;