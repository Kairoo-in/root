import type { Metadata } from "next";

import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Grid } from "@/components/layout/Grid";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { CTA } from "@/components/blocks/CTA";
import { features } from "@/engines/ai/features/registry";
import { routes } from "@/config/routes";

import { CareerToolGrid, type CareerToolCard } from "./CareerToolGrid";

export const metadata: Metadata = {
  title: "Career & Coaching Tools — Kairoo",
  description:
    "The full Kairoo career toolkit: AI tools for roadmaps, interviews, salary negotiation, performance reviews, networking, and more — the real, single-source catalog from our AI engine.",
};

/**
 * Career tools catalog. The registry in `engines/ai/features/registry.ts` is the
 * single source of truth for what the AI engine can do — this page renders the
 * `career` category directly from it, so the catalog can never drift from the
 * product. Honest-public: counts are derived from the registry (no invented
 * numbers), and any tool that is not `ready` is labeled "Coming soon".
 */
const careerTools = features.filter((f) => f.category === "career");

const cards: CareerToolCard[] = careerTools.map((f) => ({
  id: f.id,
  name: f.name,
  description: f.description,
  icon: f.icon,
  ready: f.status === "ready",
}));

const readyCount = cards.filter((c) => c.ready).length;
const comingSoonCount = cards.length - readyCount;

const stats: { label: string; value: string }[] = [
  { label: "Career & coaching tools", value: `${cards.length}` },
  { label: "Ready to use today", value: `${readyCount}` },
  { label: "Powered by", value: "AI" },
];

export default function CareerFeaturesPage() {
  return (
    <>
      <Section>
        <Stack gap={10}>
          <PageHeader
            eyebrow="Features · Career"
            title="Your complete career toolkit"
            subtitle={
              comingSoonCount > 0
                ? `${cards.length} AI tools that turn ambiguous career goals into concrete, sequenced action — from roadmaps and interview prep to salary negotiation and performance reviews. ${readyCount} are ready to use today.`
                : `${cards.length} AI tools that turn ambiguous career goals into concrete, sequenced action — from roadmaps and interview prep to salary negotiation and performance reviews.`
            }
          />

          {/* Honest stat band — every figure is derived from the live registry. */}
          <Grid cols={3} gap="md">
            {stats.map((stat) => (
              <Card key={stat.label} className="p-6">
                <Stack gap={1}>
                  <span className="text-h2 text-foreground">{stat.value}</span>
                  <span className="text-body-sm text-muted-foreground">{stat.label}</span>
                </Stack>
              </Card>
            ))}
          </Grid>
        </Stack>
      </Section>

      <Section className="pt-0">
        <CareerToolGrid tools={cards} />
      </Section>

      <CTA
        headline="Put the whole toolkit to work"
        body="Every tool here is one prompt away from a tailored plan. Start free and add the ones you need."
        primary={{ label: "See pricing", href: routes.pricing }}
        secondary={{ label: "Talk to us", href: routes.contact }}
      />
    </>
  );
}
