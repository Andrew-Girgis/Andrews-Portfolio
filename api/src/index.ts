import { Hono } from "hono";
import { cors } from "hono/cors";
import { bodyLimit } from "hono/body-limit";
import { Env } from "./types";
import { handleGreeting } from "./greeting";
import { handleChat } from "./chat";
import { handleHealth } from "./health";
import { cancelBookingDraft, confirmBooking, createBookingDraft, selectBookingSlot } from "./booking";

const app = new Hono<{ Bindings: Env }>();

app.use("*", cors({
  origin: (origin, c) => {
    const allowed = c.env.ALLOWED_ORIGINS.split(",").map((value: string) => value.trim());
    if (/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) return origin;
    return allowed.includes(origin) ? origin : allowed[0];
  },
  allowMethods: ["GET", "POST", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type"],
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

app.post("/api/chat", handleChat);
app.post("/api/booking/drafts", createBookingDraft);
app.post("/api/booking/drafts/:draftId/slot", selectBookingSlot);
app.post("/api/booking/drafts/:draftId/confirm", confirmBooking);
app.delete("/api/booking/drafts/:draftId", cancelBookingDraft);

app.options("/api/greeting", (c) => new Response(null, { status: 204 }));
app.options("/api/health", (c) => new Response(null, { status: 204 }));
app.options("/api/chat", (c) => new Response(null, { status: 204 }));

app.notFound((c) => c.json({ error: "Not found" }, 404));

export default app;
