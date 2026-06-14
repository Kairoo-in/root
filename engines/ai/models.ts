import type { ModelTier, ModelCandidate } from "./types";

export const models = { default: "gemini-2.5-flash-lite" } as const;
export type ModelKey = keyof typeof models;

export const MODEL_TIERS: Record<ModelTier, ModelCandidate[]> = {
  fast: [
    { provider: "gemini", model: "gemini-2.5-flash-lite" },
    { provider: "groq", model: "llama-3.1-8b-instant" },
    { provider: "openrouter", model: "meta-llama/llama-3.1-8b-instruct:free" },
  ],
  balanced: [
    { provider: "gemini", model: "gemini-2.5-flash" },
    { provider: "groq", model: "llama-3.3-70b-versatile" },
  ],
  deep: [
    { provider: "gemini", model: "gemini-2.5-pro" },
    { provider: "anthropic", model: "claude-opus-4-8" },
  ],
};
