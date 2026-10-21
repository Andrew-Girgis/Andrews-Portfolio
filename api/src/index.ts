import { Hono } from "hono";
import { cors } from "hono/cors";
import { bodyLimit } from "hono/body-limit";
import { Env } from "./types";
import { handleGreeting } from "./greeting";
import { handleChat } from "./chat";
import { handleHealth } from "./health";
import { cancelBookingDraft, confirmBooking, createBookingDraft, selectBookingSlot } from "./booking";
import { isLocalRequest, requireHuman } from "./turnstile";

const app = new Hono<{ Bindings: Env }>();

app.use("*", cors({
  origin: (origin, c) => {
    const allowed = c.env.ALLOWED_ORIGINS.split(",").map((value: string) => value.trim());
    // Arbitrary localhost origins are only accepted while the Worker itself runs locally (wrangler dev).
    if (isLocalRequest(c.req.url) && /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) return origin;
    return allowed.includes(origin) ? origin : allowed[0];
  },
  allowMethods: ["GET", "POST", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "X-Turnstile-Token"],
}));

app.use("/api/booking/*", bodyLimit({
  maxSize: 8 * 1024,
  onError: (c) => c.json({ error: "Request body is too large." }, 413),
}));
app.use("/api/chat", bodyLimit({
  maxSize: 64 * 1024,
  onError: (c) => c.json({ error: "Request body is too large." }, 413),
}));

app.get("/api/greeting", handleGreeting);
app.get("/api/health", handleHealth);

// Sierra is browser-only: every chat and booking call needs a Turnstile-verified session,
// and confirming a booking (which sends a calendar invite) needs a fresh token.
app.post("/api/chat", requireHuman(), handleChat);
app.post("/api/booking/drafts", requireHuman(), createBookingDraft);
app.post("/api/booking/drafts/:draftId/slot", requireHuman(), selectBookingSlot);
app.post("/api/booking/drafts/:draftId/confirm", requireHuman({ fresh: true }), confirmBooking);
app.delete("/api/booking/drafts/:draftId", requireHuman(), cancelBookingDraft);

app.options("/api/greeting", (c) => new Response(null, { status: 204 }));
app.options("/api/health", (c) => new Response(null, { status: 204 }));
app.options("/api/chat", (c) => new Response(null, { status: 204 }));

app.notFound((c) => c.json({ error: "Not found" }, 404));

export default app;
