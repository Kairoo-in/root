import { ok, err, type Result } from "@/lib/result";
import { AppError } from "@/lib/errors";
import { logger } from "@/lib/logger";
import { MODEL_TIERS } from "./models";
import { enabledProviders, getProvider } from "./providers";
import type { GenerationRequest, GenerationResult } from "./types";

const TIMEOUT_MS = 30_000;
const RETRIES = 1;

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error("timeout")), ms)),
  ]);
}

export async function generate(req: GenerationRequest): Promise<Result<GenerationResult, AppError>> {
  const candidates = MODEL_TIERS[req.tier] ?? MODEL_TIERS.fast;
  const enabled = new Set(enabledProviders().map((p) => p.name));
  const usable = candidates.filter((c) => enabled.has(c.provider));
  if (!usable.length) return err(new AppError("No AI provider configured.", "no_provider"));

  let lastErr: unknown;
  for (const cand of usable) {
    const adapter = getProvider(cand.provider);
    if (!adapter) continue;
    for (let attempt = 0; attempt <= RETRIES; attempt++) {
      const started = Date.now();
      try {
        const res = await withTimeout(adapter.generate(req, cand.model), TIMEOUT_MS);
        logger.info("ai.generate.ok", { provider: cand.provider, model: cand.model, ms: Date.now() - started });
        return ok(res);
      } catch (e) {
        lastErr = e;
        logger.warn("ai.generate.fail", { provider: cand.provider, model: cand.model, attempt, error: String(e) });
        if (attempt < RETRIES) await new Promise((r) => setTimeout(r, 300 * (attempt + 1)));
      }
    }
  }
  return err(new AppError(`All providers failed: ${String(lastErr)}`, "upstream_error", 502));
}
