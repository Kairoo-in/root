import { sql } from "drizzle-orm";
import { db } from "@/data/client";

const MAX_REQ_PER_DAY = Number(process.env.AI_DAILY_REQUEST_CAP ?? 5000);
const MAX_TOKENS_PER_DAY = Number(process.env.AI_DAILY_TOKEN_CAP ?? 2_000_000);

export async function checkBudget(
  estTokens: number,
  scope = "global",
): Promise<{ ok: boolean; reason?: string }> {
  const day = new Date().toISOString().slice(0, 10); // YYYY-MM-DD UTC
  try {
    const rows = (await db.execute(sql`
      INSERT INTO usage_budgets (day, scope, req_count, token_estimate)
      VALUES (${day}, ${scope}, 1, ${estTokens})
      ON CONFLICT (day, scope) DO UPDATE SET
        req_count = usage_budgets.req_count + 1,
        token_estimate = usage_budgets.token_estimate + ${estTokens}
      RETURNING req_count, token_estimate
    `)) as unknown as { rows: { req_count: number; token_estimate: number }[] };

    const row = rows.rows[0];
    if (row && row.req_count > MAX_REQ_PER_DAY)
      return { ok: false, reason: "daily request cap reached" };
    if (row && row.token_estimate > MAX_TOKENS_PER_DAY)
      return { ok: false, reason: "daily token cap reached" };
    return { ok: true };
  } catch (e) {
    console.error("[checkBudget] db error, failing open:", e);
    return { ok: true };
  }
}

export function estimateTokens(
  inputs: Record<string, string>,
  expectedOutput = 700,
): number {
  const inChars = Object.values(inputs).join("").length;
  return Math.ceil(inChars / 4) + expectedOutput;
}
