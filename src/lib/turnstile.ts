import { useCallback, useEffect, useRef } from "react";

// Public site key for the "girg.is Sierra" Turnstile widget. In dev, Cloudflare's always-pass
// test key pairs with the test secret in api/.dev.vars.
export const TURNSTILE_SITE_KEY = import.meta.env.DEV
  ? "1x00000000000000000000AA"
  : import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAAFemVi_9T26lrnD9";
export const TURNSTILE_HEADER = "X-Turnstile-Token";

const TURNSTILE_ACTION = "sierra";
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=__sierraTurnstileLoaded";
const TOKEN_TIMEOUT_MS = 120_000;

type TurnstileApi = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  execute: (widgetId: string) => void;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

type TurnstileWindow = Window & {
  turnstile?: TurnstileApi;
  __sierraTurnstileLoaded?: () => void;
};

let scriptPromise: Promise<TurnstileApi> | null = null;

function loadTurnstile(): Promise<TurnstileApi> {
  const win = window as TurnstileWindow;
  if (win.turnstile) return Promise.resolve(win.turnstile);
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    win.__sierraTurnstileLoaded = () => resolve(win.turnstile!);
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.onerror = () => {
      scriptPromise = null;
      script.remove();
      reject(new Error("Verification couldn't load. Check your connection and try again."));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

type PendingToken = { resolve: (token: string) => void; reject: (error: Error) => void; timer: number };

/**
 * Renders an interaction-only Turnstile widget into `containerRef` and hands out single-use tokens.
 * Most visitors never see the widget; Cloudflare only shows a checkbox when it needs one.
 */
export function useTurnstile() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const pendingRef = useRef<PendingToken | null>(null);

  const settle = useCallback((token: string | null, error?: Error) => {
    const pending = pendingRef.current;
    if (!pending) return;
    pendingRef.current = null;
    window.clearTimeout(pending.timer);
    if (token) pending.resolve(token);
    else pending.reject(error || new Error("Verification failed. Please try again."));
  }, []);

  const removeWidget = useCallback(() => {
    const turnstile = (window as TurnstileWindow).turnstile;
    if (widgetIdRef.current && turnstile) {
      try {
        turnstile.remove(widgetIdRef.current);
      } catch {
        // The widget's DOM may already be gone.
      }
    }
    widgetIdRef.current = null;
  }, []);

  // Callback ref: the chat window (and its container) mounts and unmounts as Sierra opens and closes.
  const setContainer = useCallback((node: HTMLDivElement | null) => {
    if (node === containerRef.current) return;
    removeWidget();
    settle(null, new Error("Verification was interrupted. Please try again."));
    containerRef.current = node;
  }, [removeWidget, settle]);

  const getToken = useCallback(async (): Promise<string> => {
    const turnstile = await loadTurnstile();
    const container = containerRef.current;
    if (!container) throw new Error("Open the chat to complete verification.");
    settle(null, new Error("Verification was restarted."));

    return new Promise<string>((resolve, reject) => {
      const timer = window.setTimeout(
        () => settle(null, new Error("Verification timed out. Please try again.")),
        TOKEN_TIMEOUT_MS,
      );
      pendingRef.current = { resolve, reject, timer };

      if (!widgetIdRef.current) {
        widgetIdRef.current = turnstile.render(container, {
          sitekey: TURNSTILE_SITE_KEY,
          action: TURNSTILE_ACTION,
          execution: "execute",
          appearance: "interaction-only",
          callback: (token: string) => settle(token),
          "error-callback": () => {
            settle(null);
            return true;
          },
          "timeout-callback": () => settle(null, new Error("Verification timed out. Please try again.")),
        });
      } else {
        // Tokens are single-use, so reset before asking for another one.
        turnstile.reset(widgetIdRef.current);
      }
      turnstile.execute(widgetIdRef.current);
    });
  }, [settle]);

  useEffect(() => () => {
    removeWidget();
    settle(null, new Error("Verification was interrupted."));
  }, [removeWidget, settle]);

  return { setContainer, getToken };
}
