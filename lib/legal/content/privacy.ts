import type { LegalConfig } from "@/lib/legal/config";

export const privacy = (c: LegalConfig) => `
${c.productName} ("we", "us") provides AI-powered career development tools. This Privacy
Policy explains what we collect, why, and your rights. It is operated by ${c.legalEntity}
and governed by the laws of ${c.jurisdiction}.

## Information we collect
- **Account data:** name, email, and authentication details when you create an account.
- **Profile & career data:** information you provide for career tools (e.g., resume text, goals, interview answers, skills).
- **Usage data:** how you interact with the product (features used, timestamps, device/browser).
- **Cookies:** see our [Cookie Policy](/cookies).

## How we use it
To provide and improve the service, generate AI guidance, personalize learning, maintain
security, and communicate with you. We do **not** sell your personal data.

## AI processing (important)
When you use AI features, the content you submit is sent to our AI provider, **Google
(Gemini API)**, to generate a response. Do not submit information you would not want
processed by a third-party AI service. See our [AI Disclosure](/ai-disclosure) and
[Sub-processors](/sub-processors).

## Legal bases (GDPR)
We process data to perform our contract with you, with your consent (where required), and
for our legitimate interests in operating and improving the service.

## Your rights
Depending on your location, you have rights over your personal data. Under the **EU/UK GDPR**,
**California CCPA/CPRA**, and **India's Digital Personal Data Protection Act, 2023 (DPDP)**,
you may access, correct, delete, or export your data, withdraw consent, and object to or
restrict processing. Indian users may also nominate a representative as provided under the
DPDP Act. To exercise any of these, contact **${c.dpoEmail}**. We will not discriminate
against you for exercising your rights.

## Retention
We keep personal data only as long as needed for the purposes above or as required by law,
then delete or anonymize it. You can request deletion of your account at any time.

## Sub-processors & transfers
We share data with vetted sub-processors (see [Sub-processors](/sub-processors)) who may
process it outside your country under appropriate safeguards.

## Security
We use reasonable technical and organizational measures to protect your data. See our
[Security](/security) overview.

## Children
${c.productName} is not directed to children under 16, and we do not knowingly collect their data.

## Changes
We may update this policy; material changes will be posted here with a new "last updated" date.

## Contact
Questions or requests: **${c.contactEmail}**.
`;
