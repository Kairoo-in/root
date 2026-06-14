import { GoogleGenAI } from "@google/genai";
import type { ProviderAdapter, GenerationRequest, GenerationResult } from "../types";

function getClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set");
  return new GoogleGenAI({ apiKey });
}

export const geminiAdapter: ProviderAdapter = {
  name: "gemini",

  isEnabled(): boolean {
    return Boolean(process.env.GEMINI_API_KEY);
  },

  async generate(req: GenerationRequest, model: string): Promise<GenerationResult> {
    const ai = getClient();

    // Separate system messages from conversation messages
    const systemParts = req.messages
      .filter((m) => m.role === "system")
      .map((m) => m.content)
      .join("\n\n");

    const conversationMessages = req.messages.filter((m) => m.role !== "system");

    // Map to Gemini Content[] — "assistant" → "model"
    const contents = conversationMessages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        ...(systemParts ? { systemInstruction: systemParts } : {}),
        ...(req.temperature !== undefined ? { temperature: req.temperature } : {}),
        ...(req.maxOutputTokens !== undefined ? { maxOutputTokens: req.maxOutputTokens } : {}),
        ...(req.json ? { responseMimeType: "application/json" } : {}),
        ...(req.signal ? { abortSignal: req.signal } : {}),
      },
    });

    const text = response.text ?? "";
    const usage = response.usageMetadata
      ? {
          inputTokens: response.usageMetadata.promptTokenCount,
          outputTokens: response.usageMetadata.candidatesTokenCount,
        }
      : undefined;
    const finishReason = response.candidates?.[0]?.finishReason?.toString();

    return { text, provider: "gemini", model, usage, finishReason };
  },
};
