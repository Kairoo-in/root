import type { Metadata } from "next";

import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Grid } from "@/components/layout/Grid";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FeatureGrid } from "@/components/blocks/FeatureGrid";
import { CTA } from "@/components/blocks/CTA";
import IconRenderer from "@/components/IconRenderer";
import { features } from "@/engines/ai/features/registry";
import type { Feature } from "@/types";

export const metadata: Metadata = {
  title: "Intelligent Learning Paths — Kairoo",
  description:
    "Curated AI learning paths, a 24/7 tutor, and project-based learning that turns any skill goal into a sequenced, hands-on curriculum.",
};

// Single source of truth: the learning features come straight from the AI
// registry, so this page can never drift from what the engine actually offers.
const learning = features.filter((f) => f.category === "learning");

const ready = learning.filter((f) => f.status === "ready");
const comingSoon = learning.filter((f) => f.status === "coming-soon");

// FeatureGrid speaks the shared `Feature` shape (id/icon/title/description).
const readyItems: Feature[] = ready.map((f) => ({
  id: f.id,
  icon: f.icon,
  title: f.name,
  description: f.description,
}));

export default function LearningFeaturesPage() {
  return (
    <>
      <Section>
        <PageHeader
          eyebrow="Intelligent Learning Paths"
          title="Learn any skill with a path that adapts to you"
          subtitle="Tell Kairoo what you want to master and the AI builds the curriculum, tutors you through it, and turns theory into portfolio-ready projects — scaled to your timeline and level."
        />
      </Section>

      <Section className="pt-0">
        <FeatureGrid
          columns={3}
          heading="Available now"
          description="Three AI-powered learning tools you can use today — each one generates a tailored, actionable plan from a couple of inputs."
          items={readyItems}
        />
      </Section>

      {comingSoon.length > 0 ? (
        <Section className="pt-0">
          <Stack gap={3} className="mb-12 max-w-2xl">
            <h2 className="text-h2 text-foreground">On the roadmap</h2>
            <p className="text-body-lg text-muted-foreground">
              The next wave of learning intelligence — visual progress analytics,
              paths that evolve as you grow, and team-level insights for
              organizations.
            </p>
          </Stack>

          <Grid cols={3} gap="lg">
            {comingSoon.map((f) => (
              <Card key={f.id} className="h-full p-6">
                <Stack gap={4}>
                  <div className="flex items-start justify-between gap-3">
                    <span
                      aria-hidden="true"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-muted-surface text-muted-foreground"
                    >
                      <IconRenderer name={f.icon} size={22} />
                    </span>
                    <Badge variant="info" size="sm">
                      Coming soon
                    </Badge>
                  </div>
                  <Stack gap={2}>
                    <h3 className="text-h4 text-foreground">{f.name}</h3>
                    <p className="text-body-sm text-muted-foreground">
                      {f.description}
                    </p>
                  </Stack>
                </Stack>
              </Card>
            ))}
          </Grid>
        </Section>
      ) : null}

      <CTA
        headline="Pick a skill. Get a path."
        body="Start free with the Explorer plan and generate your first AI learning path in minutes — no credit card required."
        primary={{ label: "Get started free", href: "/pricing" }}
        secondary={{ label: "Explore all features", href: "/features" }}
      />
    </>
  );
}
