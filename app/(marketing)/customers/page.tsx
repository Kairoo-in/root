import type { Metadata } from "next";
import { Award, Sparkles, TrendingUp } from "lucide-react";

import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { StatGrid } from "@/components/blocks/StatCounter";
import { TestimonialGrid } from "@/components/blocks/Testimonial";
import { CTA } from "@/components/blocks/CTA";

import { testimonials } from "@/content/testimonials";

export const metadata: Metadata = {
  title: "Customers — Kairoo",
  description:
    "See how professionals and organizations transform their careers with Kairoo: real success stories and the measurable impact on skill acquisition, salary, and team productivity.",
};

/**
 * Impact metrics — existing marketing claims preserved from the original
 * homepage (CONTENT-MAP §A "Impact metrics"). StatCounter takes a numeric
 * `value` with optional `prefix`/`suffix`, so each headline figure is split
 * accordingly (e.g. "$50K+" -> prefix "$", value 50, suffix "K+").
 */
const impactMetrics = [
  { value: 75, suffix: "%", label: "Faster Skill Acquisition" },
  { value: 50, prefix: "$", suffix: "K+", label: "Average Salary Increase" },
  { value: 6, suffix: " mo", label: "Average Career Transition Time" },
  { value: 95, suffix: "%", label: "User Satisfaction Rate" },
];

export default function CustomersPage() {
  return (
    <>
      <Section>
        <Stack gap={6}>
          <Badge variant="neutral" className="w-fit">
            <Sparkles aria-hidden className="size-3.5" />
            Customer Stories
          </Badge>
          <PageHeader
            eyebrow="Proof, not promises"
            title="Trusted by professionals and teams who are leveling up"
            subtitle="See how individuals and organizations are transforming their careers and skill development with Kairoo — from career switches and promotions to enterprise-wide productivity gains."
          />
        </Stack>
      </Section>

      <TestimonialGrid
        eyebrow="In their words"
        heading="Success stories from across the industry"
        description="Real outcomes from professionals who used Kairoo's AI-powered learning paths, coaching, and analytics to move their careers forward."
        items={testimonials}
        variant="elevated"
        cols={3}
      />

      <Section>
        <Stack gap={10}>
          <Stack gap={3} className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-overline text-accent">
              <TrendingUp aria-hidden className="size-4" />
              Measurable Impact
            </span>
            <h2 className="text-h2 text-foreground">
              Measurable impact across industries
            </h2>
            <p className="text-body text-muted-foreground">
              The outcomes our customers report — faster upskilling, stronger
              compensation, quicker transitions, and high satisfaction.
            </p>
          </Stack>
          <StatGrid items={impactMetrics} cols={4} gap="lg" />
        </Stack>
      </Section>

      <Section>
        <Stack
          direction="row"
          gap={3}
          align="center"
          className="rounded-2xl border border-border bg-muted/40 p-6 text-body-sm text-muted-foreground"
        >
          <Award aria-hidden className="size-5 shrink-0 text-accent" />
          <p>
            Outcomes vary by individual goals, effort, and starting point. The
            figures above reflect reported customer results.
          </p>
        </Stack>
      </Section>

      <CTA
        headline="Write your own success story"
        body="Start building your AI-powered career and learning command center today."
        primary={{ label: "Launch Your Journey", href: "/pricing" }}
        secondary={{ label: "Explore Features", href: "/features" }}
      />
    </>
  );
}
