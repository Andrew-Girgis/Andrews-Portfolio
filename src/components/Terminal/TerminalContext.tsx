import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

export interface TerminalLine {
  id: string;
  type: "input" | "output" | "error" | "system";
  content: string;
  timestamp: number;
}

interface TerminalContextType {
  lines: TerminalLine[];
  addLine: (type: TerminalLine["type"], content: string) => void;
  clearLines: () => void;
  executeCommand: (input: string) => Promise<void>;
  commandHistory: string[];
  historyIndex: number;
  setHistoryIndex: (index: number) => void;
}

const TerminalContext = createContext<TerminalContextType | null>(null);

const STORAGE_KEY = "terminal-history";
const MAX_HISTORY = 200;

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function TerminalProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<TerminalLine[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return [];
  });
  const [commandHistory, setCommandHistory] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("terminal-cmd-history");
      if (stored) return JSON.parse(stored);
    } catch {}
    return [];
  });
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines.slice(-MAX_HISTORY)));
    } catch {}
  }, [lines]);

  useEffect(() => {
    try {
      localStorage.setItem("terminal-cmd-history", JSON.stringify(commandHistory.slice(-100)));
    } catch {}
  }, [commandHistory]);

  const addLine = useCallback((type: TerminalLine["type"], content: string) => {
    const line: TerminalLine = {
      id: generateId(),
      type,
      content,
      timestamp: Date.now(),
    };
    setLines((prev) => [...prev.slice(-MAX_HISTORY + 1), line]);
  }, []);

  const clearLines = useCallback(() => {
    setLines([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  const executeCommand = useCallback(
    async (input: string) => {
      const trimmed = input.trim();
      if (!trimmed) return;

      addLine("input", `$ ${trimmed}`);
      setCommandHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);

      const parts = trimmed.split(/\s+/);
      const command = parts[0].toLowerCase();
      const args = parts.slice(1);

      const { commands } = await import("./commands");
      const cmd = commands[command];

      if (cmd) {
        const output = await cmd.execute(args, { addLine, clearLines });
        if (output) {
          if (typeof output === "string") {
            addLine("output", output);
          }
        }
      } else {
        addLine("error", `command not found: ${command}. Type 'help' for available commands.`);
      }
    },
    [addLine, clearLines]
  );

  return (
    <TerminalContext.Provider
      value={{ lines, addLine, clearLines, executeCommand, commandHistory, historyIndex, setHistoryIndex }}
    >
      {children}
    </TerminalContext.Provider>
  );
}

export function useTerminal() {
  const context = useContext(TerminalContext);
  if (!context) {
    throw new Error("useTerminal must be used within a TerminalProvider");
  }
  return context;
}