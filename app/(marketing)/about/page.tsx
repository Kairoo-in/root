import type { Metadata } from "next";

import { Hero } from "@/components/blocks/Hero";
import { BentoGrid, type BentoItem } from "@/components/blocks/BentoGrid";
import { FeatureGrid } from "@/components/blocks/FeatureGrid";
import { CTA } from "@/components/blocks/CTA";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Prose } from "@/components/layout/Prose";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { Feature } from "@/types";
import {
  Compass,
  GraduationCap,
  BarChart3,
  Target,
  ShieldCheck,
  Sparkles,
  Heart,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Kairoo — The right moment to grow",
  description:
    "Kairoo turns chaotic career development into strategic growth — combining AI-powered learning paths, a complete career toolkit, and business intelligence in one integrated platform.",
};

/**
 * What makes Kairoo different — the three real product pillars, framed as
 * positioning (not fabricated metrics). Sourced from CONTENT-MAP §A Platform
 * Overview / §C primary value proposition (public-safe parts).
 */
const PILLARS: BentoItem[] = [
  {
    id: "career",
    span: "2x1",
    icon: <Compass />,
    title: "A complete career toolkit",
    description:
      "Dynamic roadmaps, an interview coach, salary-negotiation prep, performance-review help, and a deep catalogue of AI-powered tools — so every stage of your career has a clear next step.",
  },
  {
    id: "learning",
    icon: <GraduationCap />,
    title: "Intelligent learning paths",
    description:
      "Personalized curricula, an AI tutor, progress tracking, and project-based practice that adapt as your goals and skills change.",
  },
  {
    id: "intelligence",
    icon: <BarChart3 />,
    title: "Strategic business intelligence",
    description:
      "Market research, persona development, go-to-market planning, and team analytics that connect individual growth to organizational outcomes.",
  },
  {
    id: "integrated",
    span: "2x1",
    icon: <Sparkles />,
    title: "One integrated platform",
    description:
      "Career tools, learning, and intelligence share a single surface — no scattered tabs, no lost context. Growth becomes a strategy, not a scramble.",
  },
];

/**
 * Company values — rendered through FeatureGrid (string icon names resolved by
 * IconRenderer). These are principles, not claims.
 */
const VALUES: Feature[] = [
  {
    id: "timing",
    icon: "compass",
    title: "Timing over hustle",
    description:
      "Growth isn't only about effort — it's about acting at the right moment. We help people recognize and seize that moment with confidence.",
  },
  {
    id: "outcomes",
    icon: "target",
    title: "Measurable outcomes",
    description:
      "Every roadmap, lesson, and tool is tied to a tangible result. Progress you can see beats activity you can't.",
  },
  {
    id: "guidance",
    icon: "lightbulb",
    title: "Guidance, not noise",
    description:
      "AI should clarify the path, not add to the overwhelm. We turn scattered resources into one clear, personalized route forward.",
  },
  {
    id: "trust",
    icon: "shield-check",
    title: "Built to be trusted",
    description:
      "We design with privacy and accountability in mind, and frame our compliance honestly — building toward the standards our users and their teams rely on.",
  },
  {
    id: "people",
    icon: "users",
    title: "People first",
    description:
      "Behind every roadmap is a person making a real decision about their future. We keep that human at the center of every feature we ship.",
  },
  {
    id: "momentum",
    icon: "trending-up",
    title: "Compounding momentum",
    description:
      "Small, well-sequenced steps compound. We optimize for sustainable progress that builds on itself over months, not motivational spikes.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Hero
        eyebrow="About Kairoo"
        title="The right moment to grow"
        subtitle="Kairoo turns chaotic career development into strategic growth — combining AI-powered learning paths, a complete career toolkit, and business intelligence in one integrated platform that helps professionals and teams accelerate skill acquisition and reach measurable outcomes."
        primaryCta={{ label: "Explore the platform", href: "/features" }}
        secondaryCta={{ label: "See pricing", href: "/pricing" }}
      />

      {/* Mission narrative */}
      <Section>
        <Stack gap={4} className="mx-auto max-w-3xl text-center">
          <p className="text-overline text-accent">Our mission</p>
          <h2 className="text-h2 text-balance text-foreground">
            Make career growth a strategy, not a scramble
          </h2>
        </Stack>
        <Prose className="mx-auto mt-10 max-w-2xl">
          <p>
            Careers used to follow a straight line. Today, the skills that
            define a role can shift in just a few years, and the resources meant
            to help — courses, coaches, communities, tools — are scattered
            across a dozen tabs. The result is a lot of effort spent on the
            wrong things at the wrong time.
          </p>
          <p>
            Kairoo exists to fix that. We bring AI-powered learning paths, a
            full career toolkit, and business intelligence together in one
            place, so people and the teams they belong to can stop guessing and
            start moving with intent. Instead of asking{" "}
            <em>&ldquo;what should I learn next?&rdquo;</em> and hoping, you get
            a clear, personalized route from where you are to where you want to
            be — and the tools to walk it.
          </p>
          <p>
            The name says it plainly: there is a right moment to grow. Our job
            is to help you find it, and then to make the next step obvious.
          </p>
        </Prose>
      </Section>

      {/* What makes Kairoo different — real product pillars */}
      <BentoGrid
        eyebrow="What we build"
        heading="Three capabilities, one platform"
        description="The product is organized around three connected pillars. Each is useful on its own — together they turn growth into a continuous, guided loop."
        items={PILLARS}
      />

      {/* Values */}
      <Section>
        <FeatureGrid
          columns={3}
          heading="What we value"
          description="The principles that shape every decision we make — from the roadmap we build to the way we talk about it."
          items={VALUES}
        />
      </Section>

      {/* Team — tasteful placeholder, no fabricated claims */}
      <Section>
        <Stack gap={4} className="mx-auto max-w-3xl text-center">
          <p className="text-overline text-accent">Our team</p>
          <h2 className="text-h2 text-balance text-foreground">
            Builders, learners, and career-changers
          </h2>
          <p className="mx-auto max-w-2xl text-body-lg text-muted-foreground">
            Kairoo is built by a small, focused team that has lived the problem
            we&rsquo;re solving — navigating career pivots, skill gaps, and the
            overwhelm of doing it alone. Detailed team profiles are on the way.
          </p>
        </Stack>

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            {
              icon: <Target aria-hidden className="h-5 w-5" />,
              title: "Product & design",
              body: "Shaping a single, focused surface where growth feels obvious instead of overwhelming.",
            },
            {
              icon: <Sparkles aria-hidden className="h-5 w-5" />,
              title: "AI & engineering",
              body: "Building the AI engine behind every roadmap, tutor, and tool — reliable, fast, and useful.",
            },
            {
              icon: <Heart aria-hidden className="h-5 w-5" />,
              title: "Learning & success",
              body: "Translating real career and learning outcomes into the guidance the product delivers.",
            },
          ].map((member) => (
            <Card key={member.title} variant="default" className="h-full p-6">
              <Stack gap={4}>
                <span
                  aria-hidden
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent-subtle text-accent"
                >
                  {member.icon}
                </span>
                <Stack gap={2}>
                  <div className="flex items-center gap-2">
                    <h3 className="text-h5 text-foreground">{member.title}</h3>
                    <Badge variant="neutral" size="sm">
                      Hiring
                    </Badge>
                  </div>
                  <p className="text-body-sm text-muted-foreground">
                    {member.body}
                  </p>
                </Stack>
              </Stack>
            </Card>
          ))}
        </div>

        <div className="mx-auto mt-8 flex max-w-3xl items-start justify-center gap-3 rounded-xl border border-border bg-muted-surface p-4 text-left">
          <ShieldCheck aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <p className="text-body-sm text-muted-foreground">
            We keep our story honest. As Kairoo grows, we&rsquo;ll introduce the
            people behind it here — with real names, roles, and the work
            they&rsquo;ve shipped.
          </p>
        </div>
      </Section>

      <CTA
        headline="There's a right moment to grow. Make it now."
        body="Start with a personalized roadmap, or talk to us about rolling Kairoo out across your team."
        primary={{ label: "Get started", href: "/pricing" }}
        secondary={{ label: "Talk to us", href: "/contact" }}
      />
    </>
  );
}
