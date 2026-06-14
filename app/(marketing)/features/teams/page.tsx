import type { Metadata } from "next";

import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { Stack } from "@/components/layout/Stack";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FeatureGrid } from "@/components/blocks/FeatureGrid";
import { CTA } from "@/components/blocks/CTA";
import TeamSkillChart from "@/components/TeamSkillChart";
import type { Feature } from "@/types";

export const metadata: Metadata = {
  title: "Team & Enterprise Analytics — Kairoo",
  description:
    "Enterprise-grade team analytics for skill tracking, development planning, and performance. Real-time team insights, predictive analytics, and goal alignment — visualized in the Team Skill Matrix.",
};

/**
 * The three pillars of Kairoo's enterprise team analytics. Relocated verbatim
 * (rephrased, no facts dropped) from the home "Enterprise-Grade Team
 * Analytics" section. Icon names resolve through IconRenderer's map.
 */
const ANALYTICS_PILLARS: Feature[] = [
  {
    id: "real-time-insights",
    icon: "users",
    title: "Real-Time Team Insights",
    description:
      "Monitor skill development across your entire organization as it happens, so you always know where your team stands.",
  },
  {
    id: "predictive-analytics",
    icon: "trending-up",
    title: "Predictive Analytics",
    description:
      "Forecast skill gaps and plan strategic development initiatives before they become bottlenecks.",
  },
  {
    id: "goal-alignment",
    icon: "target",
    title: "Goal Alignment",
    description:
      "Connect individual development with business objectives so growth ladders up to outcomes that matter.",
  },
];

export default function TeamsFeaturePage() {
  return (
    <>
      <Section>
        <PageHeader
          eyebrow="Teams & Enterprise"
          title="Enterprise-Grade Team Analytics"
          subtitle="Transform your organization with AI-powered team skill tracking, development planning, and performance analytics — built for the way real teams grow."
        />
      </Section>

      <Section className="pt-0">
        <FeatureGrid items={ANALYTICS_PILLARS} columns={3} />
      </Section>

      <Section className="pt-0">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <Stack gap={4}>
            <Badge variant="info" className="w-fit">
              Sample team snapshot
            </Badge>
            <h2 className="text-h2 text-foreground">Team Skill Matrix</h2>
            <p className="text-body-lg text-muted-foreground">
              See team strengths at a glance. The Skill Matrix maps your team&apos;s
              average proficiency against an industry benchmark across six
              dimensions — AI/ML, leadership, technical skills, communication,
              strategy, and innovation — so you can target development where it
              moves the needle.
            </p>
            <ul className="flex flex-col gap-2 text-body-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span
                  aria-hidden
                  className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                />
                Compare against an industry benchmark on every axis.
              </li>
              <li className="flex items-start gap-2">
                <span
                  aria-hidden
                  className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                />
                Surface skill gaps to prioritize development planning.
              </li>
              <li className="flex items-start gap-2">
                <span
                  aria-hidden
                  className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                />
                Tie individual growth to organization-wide objectives.
              </li>
            </ul>
          </Stack>

          <Card variant="elevated" className="p-6 sm:p-8">
            <h3 className="mb-6 text-center text-h4 text-foreground">
              Team Skill Matrix
            </h3>
            <TeamSkillChart />
          </Card>
        </div>
      </Section>

      <CTA
        headline="Bring analytics to your whole team"
        body="Give every leader real-time visibility into skill development, gaps, and goal alignment — powered by the same AI engine behind Kairoo's individual tools."
        primary={{ label: "Explore Enterprise", href: "/pricing" }}
        secondary={{ label: "See all features", href: "/features" }}
      />
    </>
  );
}
