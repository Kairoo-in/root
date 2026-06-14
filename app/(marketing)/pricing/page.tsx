import type { Metadata } from "next";
import {
  ShieldCheck,
  Clock,
  Headset,
  Sparkles,
  Lock,
  CreditCard,
} from "lucide-react";

import { tiers } from "@/config/tiers";
import type { FAQItem } from "@/types";

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { PageHeader } from "@/components/layout/PageHeader";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/Alert";

import { PricingTable } from "@/components/blocks/PricingTable";
import { FAQ } from "@/components/blocks/FAQ";
import { CTA } from "@/components/blocks/CTA";

export const metadata: Metadata = {
  title: "Pricing — Kairoo",
  description:
    "Simple, transparent pricing for your AI career copilot. Start free, upgrade to Pro for unlimited paths and daily coaching, or talk to us about Enterprise. No card required to begin.",
};

/**
 * Objection-handling trio — surfaced as Cards directly under the plans so the
 * three most common pre-purchase hesitations are answered before the FAQ.
 * Copy is honest/defensible: it reflects the real free tier and product setup.
 */
const objections = [
  {
    icon: ShieldCheck,
    title: "No-risk trial",
    body: "Start on the free Explorer plan with no credit card. Pro includes a free trial, and you can downgrade or cancel anytime — keep full access to your free plan.",
  },
  {
    icon: Clock,
    title: "Quick setup",
    body: "Get to your first AI career check-in in under five minutes. Tell Kairoo your goals and your copilot maps an actionable path — no lengthy onboarding or imports required.",
  },
  {
    icon: Headset,
    title: "Expert support",
    body: "Every plan includes community access and guided help. Pro adds priority support, and Enterprise comes with a dedicated success manager to onboard your team.",
  },
] as const;

const pricingFaq: FAQItem[] = [
  {
    id: "free-plan",
    question: "Is the free plan really free?",
    answer:
      "Yes. The Explorer plan is $0 forever and needs no credit card. It includes one active career path, weekly AI check-ins, and community access — enough to experience your AI copilot before deciding to upgrade.",
  },
  {
    id: "free-vs-pro",
    question: "What's the difference between Free and Pro?",
    answer:
      "Explorer (free) gives you a single active career path with weekly AI check-ins. Pro unlocks unlimited career paths, daily AI coaching, skill-gap analysis, and priority support — designed for people actively driving a transition or promotion.",
  },
  {
    id: "billing",
    question: "How does Pro billing work?",
    answer:
      "Pro is billed monthly at the price shown above. You can start with a free trial, and upgrade, downgrade, or cancel at any time. If you cancel, you keep access to the free Explorer plan.",
  },
  {
    id: "enterprise",
    question: "What's included in Enterprise?",
    answer:
      "Enterprise includes everything in Pro plus team dashboards, SSO and audit logs, and a dedicated success manager. Pricing is custom and based on team size and rollout needs — contact sales to scope a plan for your organization.",
  },
  {
    id: "switch-plans",
    question: "Can I change plans later?",
    answer:
      "Anytime. Upgrade to unlock more capability the moment you need it, or move back down without losing your account. Your career paths and history stay with you across plan changes.",
  },
  {
    id: "data",
    question: "Is my data private and secure?",
    answer:
      "Your career data is handled with privacy in mind, encrypted in transit, and never sold. We are building toward independent security and privacy attestations and design our practices to be SOC 2 and GDPR compliance-ready.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Page header */}
      <Section>
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <PageHeader
            className="items-center text-center"
            eyebrow="Pricing"
            title="Pricing that grows with your career"
            subtitle="Start free with your AI career copilot. Upgrade to Pro when you're ready to move faster, or talk to us about rolling Kairoo out across your team."
          />
        </div>
      </Section>

      {/* Plans — driven by the single source of truth in config/tiers.ts */}
      <PricingTable
        tiers={tiers}
        eyebrow="Plans"
        title="Choose the plan that fits where you're headed"
        description="Every plan includes your AI career copilot. No credit card required to start on Explorer."
      />

      {/* Objection-handling trio */}
      <Section aria-labelledby="why-kairoo-heading">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <p className="text-overline text-primary">Buy with confidence</p>
          <h2 id="why-kairoo-heading" className="mt-3 text-h2 text-foreground">
            Built to remove the guesswork
          </h2>
          <p className="mt-4 text-body-lg text-muted-foreground">
            Three reasons people feel comfortable starting with Kairoo today.
          </p>
        </div>

        <Grid cols={3} gap="lg" className="mt-12 items-stretch">
          {objections.map(({ icon: Icon, title, body }) => (
            <Card key={title} variant="default" className="flex h-full flex-col p-6">
              <span
                aria-hidden="true"
                className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary"
              >
                <Icon className="size-5" strokeWidth={2} />
              </span>
              <h3 className="mt-5 text-h5 text-foreground">{title}</h3>
              <p className="mt-3 text-body-sm text-muted-foreground">{body}</p>
            </Card>
          ))}
        </Grid>

        {/* Trust line — compliance framed honestly as "compliance-ready" */}
        <div className="mx-auto mt-12 max-w-3xl">
          <Alert variant="info" className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <Lock className="mt-0.5 size-5 shrink-0 text-info" strokeWidth={2} aria-hidden="true" />
              <div>
                <AlertTitle className="text-info">Privacy and security by design</AlertTitle>
                <AlertDescription>
                  Data encrypted in transit and never sold. Our practices are designed to be SOC 2
                  and GDPR compliance-ready.
                </AlertDescription>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
              <Badge variant="info">SOC 2 compliance-ready</Badge>
              <Badge variant="info">GDPR compliance-ready</Badge>
            </div>
          </Alert>
        </div>
      </Section>

      {/* Pricing FAQ */}
      <FAQ
        eyebrow="Questions"
        title="Pricing FAQ"
        subtitle="Everything you need to know before you choose a plan. Still unsure? Reach out and we'll help."
        items={pricingFaq}
      />

      {/* Closing CTA */}
      <CTA
        headline="Start free. Upgrade when it pays off."
        body="Spin up your AI career copilot in minutes — no credit card, no risk. See where Kairoo can take you."
        primary={{ label: "Get started free", href: "/contact" }}
        secondary={{ label: "Talk to sales", href: "/contact" }}
      />

      {/* Minimal reassurance footer line under the CTA */}
      <Section className="pt-0">
        <Container>
          <p className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center text-body-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <CreditCard className="size-4 text-success" strokeWidth={2} aria-hidden="true" />
              No credit card to start
            </span>
            <span className="inline-flex items-center gap-2">
              <Sparkles className="size-4 text-success" strokeWidth={2} aria-hidden="true" />
              Free plan forever
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4 text-success" strokeWidth={2} aria-hidden="true" />
              Cancel anytime
            </span>
          </p>
        </Container>
      </Section>
    </>
  );
}
