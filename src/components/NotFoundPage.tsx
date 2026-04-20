import { useEffect, useMemo, useState } from "react";

interface NotFoundPageProps {
  initialPath: string;
}

interface QuerySegment {
  text: string;
  className: string;
}

interface QueryLine {
  lineNumber: number;
  segments: QuerySegment[];
}

const TYPING_BASE_DELAY_MS = 36;
const EXECUTION_DELAY_MS = 1200;

function truncatePath(path: string) {
  if (path.length <= 52) {
    return path;
  }

  return `${path.slice(0, 32)}...${path.slice(-16)}`;
}

function escapeSqlString(value: string) {
  return value.replace(/'/g, "''");
}

function buildQueryLines(path: string): QueryLine[] {
  return [
    {
      lineNumber: 1,
      segments: [
        { text: "SELECT ", className: "text-primary" },
        { text: "id", className: "text-foreground" },
        { text: ", ", className: "text-muted-foreground" },
        { text: "name", className: "text-foreground" },
        { text: ", ", className: "text-muted-foreground" },
        { text: "url", className: "text-foreground" },
      ],
    },
    {
      lineNumber: 2,
      segments: [
        { text: "FROM ", className: "text-primary" },
        { text: "pages", className: "text-foreground" },
      ],
    },
    {
      lineNumber: 3,
      segments: [
        { text: "WHERE ", className: "text-primary" },
        { text: "url", className: "text-foreground" },
        { text: " = ", className: "text-muted-foreground" },
        { text: `'${path}'`, className: "text-accent" },
        { text: ";", className: "text-muted-foreground" },
      ],
    },
  ];
}

function getLineText(line: QueryLine) {
  return line.segments.map((segment) => segment.text).join("");
}

function renderLineSegments(line: QueryLine, visibleChars: number) {
  let remainingChars = visibleChars;

  return line.segments.map((segment, index) => {
    if (remainingChars <= 0) {
      return null;
    }

    const visibleText = segment.text.slice(0, remainingChars);
    remainingChars -= visibleText.length;

    if (!visibleText) {
      return null;
    }

    return (
      <span key={`${line.lineNumber}-${index}`} className={segment.className}>
        {visibleText}
      </span>
    );
  });
}

const NotFoundPage = ({ initialPath }: NotFoundPageProps) => {
  const [path, setPath] = useState(initialPath || "/unknown");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean | null>(null);
  const [phase, setPhase] = useState<"typing" | "executing" | "result">("typing");
  const [typedChars, setTypedChars] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const actualPath = `${window.location.pathname}${window.location.search}` || initialPath || "/unknown";
    setPath(actualPath);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();

    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, [initialPath]);

  useEffect(() => {
    const cursorInterval = window.setInterval(() => {
      setShowCursor((current) => !current);
    }, 530);

    return () => window.clearInterval(cursorInterval);
  }, []);

  const displayPath = useMemo(() => escapeSqlString(truncatePath(path || "/unknown")), [path]);
  const queryLines = useMemo(() => buildQueryLines(displayPath), [displayPath]);
  const lineLengths = useMemo(() => queryLines.map((line) => getLineText(line).length), [queryLines]);
  const lineStartIndexes = useMemo(() => {
    let total = 0;
    return lineLengths.map((length) => {
      const start = total;
      total += length;
      return start;
    });
  }, [lineLengths]);
  const totalChars = useMemo(() => lineLengths.reduce((sum, length) => sum + length, 0), [lineLengths]);

  useEffect(() => {
    if (prefersReducedMotion === null) {
      return;
    }

    if (prefersReducedMotion) {
      setTypedChars(totalChars);
      setPhase("result");
      return;
    }

    setTypedChars(0);
    setPhase("typing");
  }, [prefersReducedMotion, totalChars, path]);

  useEffect(() => {
    if (prefersReducedMotion !== false) {
      return;
    }

    if (phase === "typing") {
      if (typedChars >= totalChars) {
        const runTimeout = window.setTimeout(() => setPhase("executing"), 350);
        return () => window.clearTimeout(runTimeout);
      }

      const delay = TYPING_BASE_DELAY_MS + Math.round(Math.random() * 18);
      const typingTimeout = window.setTimeout(() => {
        setTypedChars((current) => Math.min(current + 1, totalChars));
      }, delay);

      return () => window.clearTimeout(typingTimeout);
    }

    if (phase === "executing") {
      const executionTimeout = window.setTimeout(() => setPhase("result"), EXECUTION_DELAY_MS);
      return () => window.clearTimeout(executionTimeout);
    }
  }, [phase, prefersReducedMotion, totalChars, typedChars]);

  const suggestions = useMemo(() => {
    const lowerPath = path.toLowerCase();
    const orderedSuggestions = [
      lowerPath.includes("project") ? { href: "/projects", label: "/projects", caption: "Projects" } : null,
      lowerPath.includes("work") ? { href: "/workspace", label: "/workspace", caption: "Workspace" } : null,
      lowerPath.includes("write") || lowerPath.includes("blog")
        ? { href: "/writeups", label: "/writeups", caption: "Writeups" }
        : null,
      { href: "/", label: "/", caption: "Home" },
      { href: "/projects", label: "/projects", caption: "Projects" },
      { href: "/workspace", label: "/workspace", caption: "Workspace" },
      { href: "/writeups", label: "/writeups", caption: "Writeups" },
    ].filter(Boolean) as { href: string; label: string; caption: string }[];

    return orderedSuggestions.filter(
      (suggestion, index, array) => array.findIndex((candidate) => candidate.href === suggestion.href) === index,
    );
  }, [path]);

  const executionTime = useMemo(() => (1.1 + Math.min(path.length, 12) * 0.06).toFixed(1), [path.length]);

  const resultTable = useMemo(
    () =>
      [
        "+------+----------------------+--------------------------------+",
        "| id   | name                 | url                            |",
        "+------+----------------------+--------------------------------+",
        "|      |                      |                                |",
        "+------+----------------------+--------------------------------+",
      ].join("\n"),
    [],
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsla(var(--primary),0.18),transparent_40%),linear-gradient(to_bottom,transparent,hsla(var(--background),0.92))]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-12 sm:px-10 lg:px-12">
        <div className="mb-10 space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">andrew_portfolio.route_lookup</p>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            404 - Query Returned No Results
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            The requested route is not part of this dataset. Let&apos;s inspect the query, confirm the miss,
            and route you back to something useful.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border/80 bg-card/85 shadow-[0_24px_80px_-40px_hsl(var(--foreground)/0.45)] backdrop-blur">
          <div className="flex items-center justify-between border-b border-border/80 bg-background/40 px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
              </div>
              <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">404.sql</span>
            </div>
            <span className="text-xs text-muted-foreground">
              {phase === "typing" ? "Typing query" : phase === "executing" ? "Executing query" : "Result ready"}
            </span>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
            <section className="border-b border-border/80 px-4 py-5 sm:px-6 sm:py-6 lg:border-b-0 lg:border-r">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">1. Query Editor</p>
                  <p className="mt-1 text-sm text-muted-foreground">Route lookup against the `pages` table.</p>
                </div>
                <button
                  type="button"
                  disabled
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] transition-colors ${
                    phase === "typing"
                      ? "border-border text-muted-foreground"
                      : phase === "executing"
                        ? "border-primary/60 text-primary animate-pulse"
                        : "border-accent/60 text-accent"
                  }`}
                >
                  {phase === "executing" ? "Running" : phase === "result" ? "Run Complete" : "Run Query"}
                </button>
              </div>

              <div className="rounded-2xl border border-border/70 bg-background/60 p-4 shadow-inner shadow-background/20">
                <div className="space-y-2">
                  {queryLines.map((line, index) => {
                    const lineLength = lineLengths[index];
                    const lineStart = lineStartIndexes[index];
                    const visibleCharsForLine = Math.max(0, Math.min(typedChars - lineStart, lineLength));
                    const cursorIsOnLine =
                      phase === "typing" && typedChars >= lineStart && typedChars <= lineStart + lineLength;

                    return (
                      <div key={line.lineNumber} className="grid grid-cols-[2rem_minmax(0,1fr)] items-start gap-4">
                        <span className="pt-0.5 text-right text-sm text-muted-foreground/70">{line.lineNumber}</span>
                        <div className="min-h-[1.65rem] text-sm sm:text-[15px]">
                          {renderLineSegments(line, visibleCharsForLine)}
                          {cursorIsOnLine && showCursor ? (
                            <span className="ml-0.5 inline-block h-[1.1rem] w-2 translate-y-1 rounded-sm bg-primary/80" />
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                  <div className="grid grid-cols-[2rem_minmax(0,1fr)] gap-4">
                    <span className="text-right text-sm text-muted-foreground/40">4</span>
                    <div className="min-h-[1.65rem] text-sm text-muted-foreground/30">-- ready</div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4 text-xs text-muted-foreground">
                  <span>database: andrew_portfolio</span>
                  <span>schema: public.routes</span>
                </div>
              </div>
            </section>

            <section className="px-4 py-5 sm:px-6 sm:py-6">
              <div className="space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">2. Query Status</p>
                  {phase === "typing" ? (
                    <p className="mt-2 text-sm text-muted-foreground">Waiting for the query editor to finish composing the route lookup.</p>
                  ) : null}

                  {phase === "executing" ? (
                    <div className="mt-3 flex items-center gap-3 rounded-2xl border border-primary/30 bg-background/50 px-4 py-3 text-sm text-foreground">
                      <span className="h-3 w-3 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
                      <span>Executing query against the route index...</span>
                    </div>
                  ) : null}

                  {phase === "result" ? (
                    <div className="mt-3 rounded-2xl border border-border/70 bg-background/50 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Execution time</p>
                      <p className="mt-2 text-lg font-medium text-foreground">{executionTime} ms</p>
                    </div>
                  ) : null}
                </div>

                {phase === "result" ? (
                  <>
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">3. Query Result</p>
                      <p className="mt-2 text-2xl font-semibold text-primary">0 rows returned</p>
                      <div className="mt-4 overflow-x-auto rounded-2xl border border-border/70 bg-background/60 p-4">
                        <pre className="text-xs leading-6 text-foreground sm:text-sm">{resultTable}</pre>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">4. Message</p>
                      <p className="mt-2 text-lg font-medium text-foreground">No results found.</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        This page doesn&apos;t exist in our dataset.
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">5. Did You Mean</p>
                      <div className="mt-3 flex flex-wrap gap-3">
                        {suggestions.map((suggestion) => (
                          <a
                            key={suggestion.href}
                            href={suggestion.href}
                            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-2 text-sm text-foreground transition-colors hover:border-primary/60 hover:text-primary"
                          >
                            <span className="text-primary">/</span>
                            <span>{suggestion.label === "/" ? "home" : suggestion.label.slice(1)}</span>
                            <span className="text-xs text-muted-foreground">{suggestion.caption}</span>
                          </a>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">6. Actions</p>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        <a
                          href="/"
                          className="rounded-2xl border border-primary/40 bg-primary/10 px-4 py-3 text-sm text-foreground transition-colors hover:bg-primary/15"
                        >
                          <span className="block text-xs uppercase tracking-[0.2em] text-primary">Run another query</span>
                          <span className="mt-1 block font-medium">Return home</span>
                        </a>
                        <a
                          href="/projects"
                          className="rounded-2xl border border-border bg-background/70 px-4 py-3 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                        >
                          <span className="block text-xs uppercase tracking-[0.2em] text-muted-foreground">View all tables</span>
                          <span className="mt-1 block font-medium">Open projects</span>
                        </a>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
