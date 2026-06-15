const appName = process.env.NEXT_PUBLIC_APP_NAME || process.env.APP_NAME || "Kairoo";
const domain = appName.toLowerCase() === "kairoo" ? "kairoo.com" : "astrapath.ai";

export const site = {
  name: appName,
  tagline: "The right moment to grow.",
  description: `${appName} career development that grows with you.`,
  baseUrl: `https://${domain}`,
  supportEmail: `support@${domain}`,
  investorEmail: `investors@${domain}`,
} as const;

export type Site = typeof site;
