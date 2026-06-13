import type { LegalConfig } from "@/lib/legal/config";

export const cookies = (c: LegalConfig) => `
${c.productName} uses cookies and similar technologies. This policy explains the categories
and your choices.

## Categories
- **Strictly necessary:** required for the site to work (e.g., authentication, security, theme preference). Always on.
- **Analytics (optional):** help us understand usage to improve the product. Off until you consent.
- **Preferences (optional):** remember choices you make.

## Your choices
You can accept or reject optional cookies via our consent banner, and change your choice
anytime by clearing the stored preference. Strictly-necessary cookies cannot be disabled.

## Analytics
Analytics are only loaded after you consent. (No third-party analytics run until then.)

## Contact
**${c.contactEmail}**.
`;
