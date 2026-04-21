import OpenAI from "openai";
import { Env } from "./types";

let openaiInstance: OpenAI | null = null;

export function getOpenAI(env: Env): OpenAI {
  if (openaiInstance) return openaiInstance;

  openaiInstance = new OpenAI({ apiKey: env.OPENAI_API_KEY });

  return openaiInstance;
}