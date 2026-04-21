import { useState, useEffect, useRef } from "react";

interface TypingAnimationProps {
  lines: { text: string; font?: string; delay?: number }[];
  speed?: number;
  onComplete?: () => void;
}

const TypingAnimation = ({ lines, speed = 50, onComplete }: TypingAnimationProps) => {
  const [mounted, setMounted] = useState(false);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [greetingText, setGreetingText] = useState<string | null>(null);
  const [isTypingGreeting, setIsTypingGreeting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const hasFetchedGreeting = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchGreeting = async () => {
      if (hasFetchedGreeting.current) return;
      hasFetchedGreeting.current = true;
      try {
        const response = await fetch("/api/greeting");
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          setGreetingText("Welcome!");
          return;
        }
        if (response.ok) {
          const data = await response.json();
          const clean = data.text?.replace(/<[^>]*>/g, "").trim() || "Welcome!";
          setGreetingText(clean);
        } else {
          setGreetingText("Welcome!");
        }
      } catch {
        setGreetingText("Welcome!");
      }
    };
    fetchGreeting();
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const totalStaticLines = lines.length;
    const allLinesLength = totalStaticLines + (greetingText ? 1 : 0);

    if (currentLineIndex >= allLinesLength) {
      onComplete?.();
      return;
    }

    const currentLine =
      currentLineIndex < totalStaticLines
        ? lines[currentLineIndex].text
        : greetingText!;

    if (currentCharIndex < currentLine.length) {
      const lineDelay = currentLineIndex < totalStaticLines
        ? lines[currentLineIndex].delay ?? 0
        : 0;

      if (currentCharIndex === 0 && lineDelay > 0) {
        const timer = setTimeout(() => {
          setCurrentCharIndex(1);
          setDisplayedLines((prev) => [...prev, ""]);
        }, lineDelay);
        return () => clearTimeout(timer);
      }

      const timer = setTimeout(() => {
        setCurrentCharIndex((prev) => prev + 1);
        setDisplayedLines((prev) => {
          const updated = [...prev];
          updated[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1);
          return updated;
        });
      }, speed + Math.random() * speed * 0.6);
      return () => clearTimeout(timer);
    } else {
      const pauseDuration = currentLineIndex < totalStaticLines - 1 ? 300 : 500;
      const timer = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, pauseDuration);
      return () => clearTimeout(timer);
    }
  }, [currentLineIndex, currentCharIndex, lines, greetingText, speed, onComplete]);

  const totalStaticLines = lines.length;
  const currentLineObj = currentLineIndex < totalStaticLines ? lines[currentLineIndex] : null;

  return (
    <div className="space-y-3">
      {!mounted && displayedLines.length === 0 && (
        <>
          {lines.map((line, i) => (
            <p
              key={`ssr-${i}`}
              className={`${
                line.font === "handwriting"
                  ? "font-handwriting"
                  : line.font === "pixel"
                    ? "font-pixel"
                    : "font-mono"
              } ${
                i === 0
                  ? "text-3xl sm:text-4xl md:text-5xl whitespace-nowrap"
                  : i === 1
                    ? "text-lg sm:text-xl md:text-2xl"
                    : "text-base sm:text-lg"
              } text-foreground leading-relaxed`}
            >
              {line.text}
            </p>
          ))}
        </>
      )}
      {displayedLines.map((line, i) => {
        const fontClass =
          i < totalStaticLines && lines[i].font === "handwriting"
            ? "font-handwriting"
            : i < totalStaticLines && lines[i].font === "pixel"
              ? "font-pixel"
              : "font-mono";

        const isCurrentLine = i === currentLineIndex;
        const isLastLine = i === displayedLines.length - 1;
        const isGreetingLine = i >= totalStaticLines;

        const sizeClass = i === 0
          ? "text-3xl sm:text-4xl md:text-5xl whitespace-nowrap"
          : i === 1
            ? "text-lg sm:text-xl md:text-2xl"
            : isGreetingLine
              ? "text-base sm:text-lg text-primary"
              : "text-base sm:text-lg";

        const cursorSizeClass = i === 0
          ? "text-3xl sm:text-4xl md:text-5xl"
          : i === 1
            ? "text-lg sm:text-xl md:text-2xl"
            : isGreetingLine
              ? "text-base sm:text-lg"
              : "text-base sm:text-lg";

        return (
          <p
            key={i}
            className={`${fontClass} ${sizeClass} text-foreground leading-relaxed`}
          >
            {line}
            {isLastLine && (
              <span className={`${cursorSizeClass} text-primary ml-0.5 inline-block ${showCursor ? "opacity-100" : "opacity-0"}`}>|</span>
            )}
          </p>
        );
      })}
    </div>
  );
};

export default TypingAnimation;