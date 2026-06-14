import type { Metadata } from "next";

import { Section } from "@/components/layout/Section";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/Alert";
import { FAQ } from "@/components/blocks/FAQ";
import { CTA } from "@/components/blocks/CTA";
import type { FAQItem } from "@/types";
import type { StatCounterProps } from "@/components/blocks/StatCounter";

import {
  SecurityHero,
  SecurityStats,
  SecurityLayers,
  SecurityPractices,
  SecurityCompliance,
  SecurityPerformance,
  type LayerVM,
  type ComplianceVM,
  type PracticeVM,
  type TargetVM,
} from "./SecurityVisuals";

export const metadata: Metadata = {
  title: "Security & Trust | Kairoo",
  description:
    "How Kairoo protects your data: a layered security model across network, application, and data; our compliance posture (SOC 2, GDPR, HIPAA, ISO 27001) framed honestly as in-progress; and the performance targets we hold ourselves to.",
};

/* -------------------------------------------------------------------------- */
/*  Data — PUBLIC-SAFE & HONEST.                                              */
/*  Compliance is framed as "compliance-ready / in progress", NOT certified.  */
/*  Performance figures are stated as TARGETS, not measured guarantees.       */
/*  Stack references reflect the REAL app (Next.js + engines/ai Gemini).      */
/*                                                                            */
/*  RSC-SAFE: this file stays a server component (keeps `export const         */
/*  metadata`). All animation/interactivity lives in ./SecurityVisuals, and   */
/*  icons cross the boundary as NAME strings (IconRenderer keys), never as     */
/*  lucide component references.                                               */
/* -------------------------------------------------------------------------- */

// Honest reframing of the architecture badges: nothing is claimed as
// "certified" — each entry is described as ready / in progress / aligned.
const COMPLIANCE: ComplianceVM[] = [
  {
    name: "SOC 2",
    scope: "Security, availability & confidentiality controls",
    posture:
      "Targeting SOC 2 Type II. Controls are being implemented and documented ahead of a formal third-party audit.",
    status: "in-progress",
    statusLabel: "In progress",
    statusIcon: "clock-3",
    statusVariant: "info",
  },
  {
    name: "GDPR",
    scope: "EU/EEA personal data protection",
    posture:
      "Built to be GDPR-ready: data-subject access and deletion, lawful-basis handling, and EU data-processing practices.",
    status: "aligned",
    statusLabel: "Aligned",
    statusIcon: "check-circle",
    statusVariant: "success",
  },
  {
    name: "HIPAA",
    scope: "Protected health information (where applicable)",
    posture:
      "HIPAA-ready architecture for healthcare use cases. A signed BAA and full safeguards are part of our enterprise roadmap.",
    status: "in-progress",
    statusLabel: "In progress",
    statusIcon: "clock-3",
    statusVariant: "info",
  },
  {
    name: "ISO 27001",
    scope: "Information security management",
    posture:
      "Designing our information-security management system against ISO/IEC 27001 controls as we scale toward certification.",
    status: "in-progress",
    statusLabel: "In progress",
    statusIcon: "clock-3",
    statusVariant: "info",
  },
];

// Three defense layers — verbatim controls preserved from the source
// architecture page (network / application / data). Laid out as a Bento.
const LAYERS: LayerVM[] = [
  {
    title: "Network security",
    icon: "network",
    summary:
      "Traffic is filtered, encrypted, and rate-shaped before it ever reaches the app.",
    controls: [
      "Web application firewall with DDoS protection",
      "SSL / TLS 1.3 encryption in transit",
      "IP allow-listing for administrative access",
    ],
    span: "wide",
  },
  {
    title: "Application security",
    icon: "app-window",
    summary:
      "Every request is authenticated, authorized, and scoped to least privilege.",
    controls: [
      "OAuth 2.0 + JWT authentication",
      "Role-based access control (RBAC)",
      "API rate limiting and abuse protection",
    ],
    span: "cell",
  },
  {
    title: "Data security",
    icon: "database",
    summary: "Your data is encrypted at rest, minimized, and isolated by design.",
    controls: [
      "AES-256 encryption at rest",
      "PII anonymization and data minimization",
      "Secure key management (HSM-backed)",
    ],
    span: "cell",
  },
];

const PRACTICES: PracticeVM[] = [
  {
    title: "Encryption everywhere",
    icon: "lock",
    description:
      "TLS 1.3 in transit and AES-256 at rest, so your data is protected on the wire and on disk.",
  },
  {
    title: "Least-privilege access",
    icon: "key-round",
    description:
      "Role-based access control and HSM-backed key management keep credentials and secrets tightly scoped.",
  },
  {
    title: "Data minimization",
    icon: "eye-off",
    description:
      "We collect only what a feature needs and anonymize PII wherever the product allows.",
  },
  {
    title: "Continuous monitoring",
    icon: "activity",
    description:
      "Application performance monitoring, metrics, log aggregation, and error tracking give us real-time visibility into the platform.",
  },
];

// Performance figures from the architecture page, restated as TARGETS.
const PERF_TARGETS: TargetVM[] = [
  { metric: "First Contentful Paint (FCP)", target: "< 1.2s", note: "First content visible" },
  { metric: "Largest Contentful Paint (LCP)", target: "< 2.5s", note: "Main content loaded" },
  { metric: "Time to Interactive (TTI)", target: "< 3.8s", note: "Page fully responsive" },
  { metric: "API response time", target: "< 200ms", note: "Typical request latency" },
  { metric: "AI processing time", target: "< 5s", note: "Per AI-assisted action" },
];

// Headline metrics for the animated count-up band — derived from the
// performance targets and the layered model, stated as targets/figures.
const PERF_STATS: StatCounterProps[] = [
  { value: 1.2, prefix: "<", suffix: "s", label: "First Contentful Paint target" },
  { value: 200, prefix: "<", suffix: "ms", label: "API response time target" },
  { value: 256, label: "AES-bit encryption at rest" },
  { value: 3, label: "Defense-in-depth layers" },
];

const MONITORING = [
  "Application performance monitoring (APM)",
  "Metrics visualization & alerting",
  "Centralized log aggregation & search",
  "Real-time error tracking",
];

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "certified",
    question: "Is Kairoo certified for SOC 2, ISO 27001, or HIPAA today?",
    answer:
      "We are intentionally precise here: Kairoo is built to be compliance-ready and our controls are mapped to these frameworks, but we do not claim active certifications we have not yet completed. SOC 2 Type II, ISO 27001, and full HIPAA safeguards (including a BAA) are in progress on our roadmap. GDPR practices are already part of how we handle personal data.",
  },
  {
    id: "encryption",
    question: "How is my data encrypted?",
    answer:
      "Data is encrypted in transit with TLS 1.3 and at rest with AES-256. Encryption keys are managed through secure, HSM-backed key management, and administrative access is restricted with IP allow-listing and role-based access control.",
  },
  {
    id: "stack",
    question: "What does Kairoo run on?",
    answer:
      "The product is built on Next.js with a Gemini-backed AI gateway in our engines/ai layer. AI-assisted features call our models through this controlled gateway rather than exposing model access directly, so requests stay authenticated, rate-limited, and auditable.",
  },
  {
    id: "performance",
    question: "Are the performance numbers guarantees?",
    answer:
      "They are targets, not contractual guarantees. We hold ourselves to these thresholds for paint, interactivity, API latency, and AI processing, and we monitor them continuously so we can catch and fix regressions quickly.",
  },
];

/* -------------------------------------------------------------------------- */

export default function SecurityPage() {
  return (
    <>
      <SecurityHero
        eyebrow="Security & Trust"
        titleLead="Security built in,"
        titleHighlight="claims kept"
        titleTail="honest"
        subtitle="Kairoo protects your career and learning data with a layered security model, a transparent compliance posture, and performance targets we measure ourselves against — no overstated badges, just the practices behind them."
        primaryCta={{ label: "Talk to us about security", href: "/contact" }}
        secondaryCta={{ label: "See how it works", href: "/how-it-works" }}
        badges={[
          { icon: "lock", label: "TLS 1.3 + AES-256" },
          { icon: "shield-check", label: "Defense in depth" },
          { icon: "eye-off", label: "Data minimization" },
          { icon: "activity", label: "Continuous monitoring" },
        ]}
      />

      {/* Honesty note — sets expectations up front. */}
      <Section className="pt-0">
        <Alert variant="info">
          <AlertTitle>How we talk about compliance</AlertTitle>
          <AlertDescription>
            We describe our posture as <strong>compliance-ready</strong> and{" "}
            <strong>in progress</strong> rather than overstating certifications. Where a
            framework is fully reflected in how we operate today, we say so; where it is on our
            roadmap, we say that too.
          </AlertDescription>
        </Alert>
      </Section>

      {/* Performance targets as an animated count-up band. */}
      <SecurityStats
        eyebrow="Performance targets"
        heading="Fast is a feature — and a target"
        subtitle="A secure product still has to feel instant. These are figures we design and monitor against — targets, not guarantees."
        stats={PERF_STATS}
      />

      {/* Defense-in-depth layers as an asymmetric Bento of spotlight cards. */}
      <SecurityLayers
        eyebrow="Defense in depth"
        heading="A layered security model"
        subtitle="Security is enforced at every layer — from the edge of the network, through the application, down to the data itself."
        layers={LAYERS}
      />

      {/* Security practices as a 3D-tilt grid. */}
      <SecurityPractices
        eyebrow="Practices"
        heading="How we operate, day to day"
        subtitle="The principles that shape every feature we ship."
        practices={PRACTICES}
      />

      {/* Compliance posture cards + procurement callout. */}
      <SecurityCompliance
        eyebrow="Compliance posture"
        heading="Where we stand on the frameworks"
        subtitle="Each framework below shows what it covers and exactly where Kairoo sits today — stated plainly."
        items={COMPLIANCE}
        callout={{
          body:
            "Working through a procurement or vendor-security review? Reach out and we'll share our current documentation and walk you through the controls behind each framework.",
          cta: { label: "Request security docs", href: "/contact" },
        }}
      />

      {/* Detailed speed targets + monitoring split panel. */}
      <SecurityPerformance
        eyebrow="Speed & observability"
        heading="The thresholds we hold ourselves to"
        subtitle="A secure product still has to feel instant. These are the thresholds we design and monitor against. They are targets, not guarantees."
        targets={PERF_TARGETS}
        monitoring={MONITORING}
      />

      <FAQ
        eyebrow="Trust & transparency"
        title="Security questions, answered straight"
        items={FAQ_ITEMS}
      />

      <CTA
        headline="Security questions before you commit?"
        body="Tell us about your requirements and we'll walk you through our controls, documentation, and roadmap."
        primary={{ label: "Contact us", href: "/contact" }}
        secondary={{ label: "Compare plans", href: "/pricing" }}
      />
    </>
  );
}
