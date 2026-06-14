import type { Metadata } from "next";
import {
  ShieldCheck,
  Lock,
  Network,
  AppWindow,
  Database,
  KeyRound,
  EyeOff,
  Gauge,
  Activity,
  FileCheck2,
  ScrollText,
  CheckCircle2,
  Clock3,
  ArrowRight,
} from "lucide-react";

import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Grid } from "@/components/layout/Grid";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/Alert";
import { Separator } from "@/components/ui/Separator";
import { Hero } from "@/components/blocks/Hero";
import { FAQ } from "@/components/blocks/FAQ";
import { CTA } from "@/components/blocks/CTA";
import type { FAQItem } from "@/types";

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
/* -------------------------------------------------------------------------- */

type ComplianceStatus = "in-progress" | "aligned";

type Compliance = {
  name: string;
  scope: string;
  posture: string;
  status: ComplianceStatus;
};

// Honest reframing of the architecture badges: nothing is claimed as
// "certified" — each entry is described as ready / in progress / aligned.
const COMPLIANCE: Compliance[] = [
  {
    name: "SOC 2",
    scope: "Security, availability & confidentiality controls",
    posture:
      "Targeting SOC 2 Type II. Controls are being implemented and documented ahead of a formal third-party audit.",
    status: "in-progress",
  },
  {
    name: "GDPR",
    scope: "EU/EEA personal data protection",
    posture:
      "Built to be GDPR-ready: data-subject access and deletion, lawful-basis handling, and EU data-processing practices.",
    status: "aligned",
  },
  {
    name: "HIPAA",
    scope: "Protected health information (where applicable)",
    posture:
      "HIPAA-ready architecture for healthcare use cases. A signed BAA and full safeguards are part of our enterprise roadmap.",
    status: "in-progress",
  },
  {
    name: "ISO 27001",
    scope: "Information security management",
    posture:
      "Designing our information-security management system against ISO/IEC 27001 controls as we scale toward certification.",
    status: "in-progress",
  },
];

const STATUS_META: Record<
  ComplianceStatus,
  { label: string; variant: "info" | "success"; icon: typeof Clock3 }
> = {
  "in-progress": { label: "In progress", variant: "info", icon: Clock3 },
  aligned: { label: "Aligned", variant: "success", icon: CheckCircle2 },
};

type SecurityLayer = {
  title: string;
  icon: typeof Network;
  summary: string;
  controls: string[];
};

// Three defense layers — verbatim controls preserved from the source
// architecture page (network / application / data).
const LAYERS: SecurityLayer[] = [
  {
    title: "Network security",
    icon: Network,
    summary: "Traffic is filtered, encrypted, and rate-shaped before it ever reaches the app.",
    controls: [
      "Web application firewall with DDoS protection",
      "SSL / TLS 1.3 encryption in transit",
      "IP allow-listing for administrative access",
    ],
  },
  {
    title: "Application security",
    icon: AppWindow,
    summary: "Every request is authenticated, authorized, and scoped to least privilege.",
    controls: [
      "OAuth 2.0 + JWT authentication",
      "Role-based access control (RBAC)",
      "API rate limiting and abuse protection",
    ],
  },
  {
    title: "Data security",
    icon: Database,
    summary: "Your data is encrypted at rest, minimized, and isolated by design.",
    controls: [
      "AES-256 encryption at rest",
      "PII anonymization and data minimization",
      "Secure key management (HSM-backed)",
    ],
  },
];

type Practice = {
  title: string;
  icon: typeof Lock;
  description: string;
};

const PRACTICES: Practice[] = [
  {
    title: "Encryption everywhere",
    icon: Lock,
    description:
      "TLS 1.3 in transit and AES-256 at rest, so your data is protected on the wire and on disk.",
  },
  {
    title: "Least-privilege access",
    icon: KeyRound,
    description:
      "Role-based access control and HSM-backed key management keep credentials and secrets tightly scoped.",
  },
  {
    title: "Data minimization",
    icon: EyeOff,
    description:
      "We collect only what a feature needs and anonymize PII wherever the product allows.",
  },
  {
    title: "Continuous monitoring",
    icon: Activity,
    description:
      "Application performance monitoring, metrics, log aggregation, and error tracking give us real-time visibility into the platform.",
  },
];

type Target = {
  metric: string;
  target: string;
  note: string;
};

// Performance figures from the architecture page, restated as TARGETS.
const PERF_TARGETS: Target[] = [
  { metric: "First Contentful Paint (FCP)", target: "< 1.2s", note: "First content visible" },
  { metric: "Largest Contentful Paint (LCP)", target: "< 2.5s", note: "Main content loaded" },
  { metric: "Time to Interactive (TTI)", target: "< 3.8s", note: "Page fully responsive" },
  { metric: "API response time", target: "< 200ms", note: "Typical request latency" },
  { metric: "AI processing time", target: "< 5s", note: "Per AI-assisted action" },
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
      <Hero
        eyebrow="Security & Trust"
        title="Security built in, claims kept honest"
        subtitle="Kairoo protects your career and learning data with a layered security model, a transparent compliance posture, and performance targets we measure ourselves against — no overstated badges, just the practices behind them."
        primaryCta={{ label: "Talk to us about security", href: "/contact" }}
        secondaryCta={{ label: "See how it works", href: "/how-it-works" }}
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

      {/* Defense-in-depth layers */}
      <Section className="pt-0">
        <Stack gap={3} className="mb-10 max-w-2xl">
          <p className="text-overline text-primary">Defense in depth</p>
          <h2 className="text-h2 text-foreground">A layered security model</h2>
          <p className="text-body-lg text-muted-foreground">
            Security is enforced at every layer — from the edge of the network, through the
            application, down to the data itself.
          </p>
        </Stack>

        <Grid cols={3} gap="lg">
          {LAYERS.map((layer) => {
            const Icon = layer.icon;
            return (
              <Card key={layer.title} variant="default" className="h-full p-6">
                <Stack gap={4}>
                  <span
                    aria-hidden="true"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent-subtle text-accent"
                  >
                    <Icon size={22} />
                  </span>
                  <Stack gap={2}>
                    <h3 className="text-h4 text-foreground">{layer.title}</h3>
                    <p className="text-body-sm text-muted-foreground">{layer.summary}</p>
                  </Stack>
                  <Separator />
                  <ul className="flex flex-col gap-2">
                    {layer.controls.map((control) => (
                      <li
                        key={control}
                        className="flex items-start gap-2 text-body-sm text-foreground"
                      >
                        <CheckCircle2
                          aria-hidden="true"
                          size={16}
                          className="mt-0.5 shrink-0 text-success"
                        />
                        <span>{control}</span>
                      </li>
                    ))}
                  </ul>
                </Stack>
              </Card>
            );
          })}
        </Grid>
      </Section>

      {/* Security practices */}
      <Section className="pt-0">
        <Stack gap={3} className="mb-10 max-w-2xl">
          <p className="text-overline text-primary">Practices</p>
          <h2 className="text-h2 text-foreground">How we operate, day to day</h2>
          <p className="text-body-lg text-muted-foreground">
            The principles that shape every feature we ship.
          </p>
        </Stack>

        <Grid cols={2} gap="lg">
          {PRACTICES.map((practice) => {
            const Icon = practice.icon;
            return (
              <Card key={practice.title} variant="default" className="h-full p-6">
                <Stack direction="row" gap={4} align="start">
                  <span
                    aria-hidden="true"
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent-subtle text-accent"
                  >
                    <Icon size={22} />
                  </span>
                  <Stack gap={2}>
                    <h3 className="text-h4 text-foreground">{practice.title}</h3>
                    <p className="text-body-sm text-muted-foreground">{practice.description}</p>
                  </Stack>
                </Stack>
              </Card>
            );
          })}
        </Grid>
      </Section>

      {/* Compliance posture */}
      <Section className="pt-0">
        <Stack gap={3} className="mb-10 max-w-2xl">
          <p className="text-overline text-primary">Compliance posture</p>
          <h2 className="text-h2 text-foreground">Where we stand on the frameworks</h2>
          <p className="text-body-lg text-muted-foreground">
            Each framework below shows what it covers and exactly where Kairoo sits today —
            stated plainly.
          </p>
        </Stack>

        <Grid cols={2} gap="lg">
          {COMPLIANCE.map((item) => {
            const meta = STATUS_META[item.status];
            const StatusIcon = meta.icon;
            return (
              <Card key={item.name} variant="default" className="h-full p-6">
                <Stack gap={4}>
                  <Stack direction="row" gap={3} align="center" justify="between">
                    <Stack direction="row" gap={3} align="center">
                      <span
                        aria-hidden="true"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-subtle text-accent"
                      >
                        <FileCheck2 size={20} />
                      </span>
                      <h3 className="text-h4 text-foreground">{item.name}</h3>
                    </Stack>
                    <Badge variant={meta.variant} className="gap-1">
                      <StatusIcon aria-hidden="true" size={12} />
                      {meta.label}
                    </Badge>
                  </Stack>
                  <p className="text-body-sm font-medium text-foreground">{item.scope}</p>
                  <p className="text-body-sm text-muted-foreground">{item.posture}</p>
                </Stack>
              </Card>
            );
          })}
        </Grid>

        <Alert variant="neutral" className="mt-8">
          <Stack direction="row" gap={3} align="start">
            <ShieldCheck aria-hidden="true" size={20} className="mt-0.5 shrink-0 text-primary" />
            <AlertDescription>
              Working through a procurement or vendor-security review? Reach out and we&apos;ll
              share our current documentation and walk you through the controls behind each
              framework.
            </AlertDescription>
          </Stack>
        </Alert>
      </Section>

      {/* Performance targets */}
      <Section className="pt-0">
        <Stack gap={3} className="mb-10 max-w-2xl">
          <p className="text-overline text-primary">Performance targets</p>
          <h2 className="text-h2 text-foreground">Fast is a feature — and a target</h2>
          <p className="text-body-lg text-muted-foreground">
            A secure product still has to feel instant. These are the thresholds we design and
            monitor against. They are targets, not guarantees.
          </p>
        </Stack>

        <Grid cols={2} gap="lg" className="items-start">
          <Card variant="default" className="h-full p-6">
            <Stack gap={4}>
              <Stack direction="row" gap={3} align="center">
                <span
                  aria-hidden="true"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent-subtle text-accent"
                >
                  <Gauge size={22} />
                </span>
                <h3 className="text-h4 text-foreground">Speed targets</h3>
              </Stack>
              <ul className="flex flex-col">
                {PERF_TARGETS.map((t, i) => (
                  <li key={t.metric}>
                    {i > 0 ? <Separator /> : null}
                    <div className="flex items-center justify-between gap-4 py-3">
                      <div>
                        <p className="text-body-sm font-medium text-foreground">{t.metric}</p>
                        <p className="text-caption text-muted-foreground">{t.note}</p>
                      </div>
                      <span className="text-data tabular-nums text-primary">{t.target}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </Stack>
          </Card>

          <Card variant="default" className="h-full p-6">
            <Stack gap={4}>
              <Stack direction="row" gap={3} align="center">
                <span
                  aria-hidden="true"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent-subtle text-accent"
                >
                  <Activity size={22} />
                </span>
                <h3 className="text-h4 text-foreground">Monitoring & observability</h3>
              </Stack>
              <p className="text-body-sm text-muted-foreground">
                We watch these targets continuously so regressions surface fast and get fixed
                before they affect you.
              </p>
              <Separator />
              <ul className="flex flex-col gap-3">
                {MONITORING.map((m) => (
                  <li
                    key={m}
                    className="flex items-start gap-2 text-body-sm text-foreground"
                  >
                    <ScrollText
                      aria-hidden="true"
                      size={16}
                      className="mt-0.5 shrink-0 text-accent"
                    />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </Stack>
          </Card>
        </Grid>
      </Section>

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
