import { Hono } from "hono";
import { cors } from "hono/cors";
import { Env } from "./types";
import { handleGreeting } from "./greeting";
import { handleChat } from "./chat";

const app = new Hono<{ Bindings: Env }>();

app.use("*", cors({
  origin: "*",
  allowMethods: ["GET", "POST", "OPTIONS"],
  allowHeaders: ["Content-Type"],
}));

app.get("/api/greeting", handleGreeting);

app.post("/api/chat", handleChat);

app.options("/api/greeting", (c) => new Response(null, { status: 204 }));
app.options("/api/chat", (c) => new Response(null, { status: 204 }));

app.notFound((c) => c.json({ error: "Not found" }, 404));

export default app;