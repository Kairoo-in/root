import Link from "next/link";
import {
  Briefcase,
  GraduationCap,
  BarChart3,
  ArrowRight,
  Sparkles,
  Map,
  Mic,
  DollarSign,
  ClipboardList,
  BookOpen,
  Bot,
  FolderKanban,
  LineChart,
  RefreshCw,
  Users,
  Target,
  Activity,
  type LucideIcon,
} from "lucide-react";

import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { PageHeader } from "@/components/layout/PageHeader";
import { Grid } from "@/components/layout/Grid";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CTA } from "@/components/blocks/CTA";
import { features as featureRegistry } from "@/engines/ai/features/registry";

export const metadata = {
  title: "Features — The complete professional toolkit | Kairoo",
  description:
    "Explore Kairoo's three product pillars: a Career Development Suite, Intelligent Learning Paths, and Strategic Business Intelligence — powered by a growing library of AI features.",
};

// Derive headline counts straight from the AI feature registry so the page can
// never drift from what the product actually ships. Honest-public rule: every
// number here is a real product fact, not a projection.
const totalFeatures = featureRegistry.length;
const readyFeatures = featureRegistry.filter((f) => f.status === "ready").length;
const comingSoonFeatures = featureRegistry.filter(
  (f) => f.status === "coming-soon",
).length;
const careerFeatures = featureRegistry.filter(
  (f) => f.category === "career",
).length;
const learningFeatures = featureRegistry.filter(
  (f) => f.category === "learning",
).length;

type PillarHighlight = { icon: LucideIcon; label: string };

type Pillar = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  /** Footprint on the lg grid — the lead pillar spans two columns. */
  span: string;
  highlights: PillarHighlight[];
  /** Real, defensible count line for this pillar. */
  meta: string;
};

// Three product pillars from the home Platform Overview (CONTENT-MAP §A).
// Highlights are real, shipping features pulled from the registry; counts are
// derived above. No aspirational numbers live on this public page.
const pillars: Pillar[] = [
  {
    id: "career",
    eyebrow: "Pillar 01",
    title: "Career Development Suite",
    description:
      "The core of Kairoo: turn ambiguous goals into a sequenced plan and execute it with AI co-pilots for every high-stakes career moment — from roadmaps and interviews to salary conversations and performance reviews.",
    href: "/features/career",
    icon: Briefcase,
    span: "lg:col-span-2 lg:row-span-2",
    highlights: [
      { icon: Map, label: "Dynamic Roadmaps" },
      { icon: Mic, label: "Interview Coach" },
      { icon: DollarSign, label: "Salary Coach" },
      { icon: ClipboardList, label: "Review Assistant" },
    ],
    meta: `${careerFeatures} career tools`,
  },
  {
    id: "learning",
    eyebrow: "Pillar 02",
    title: "Intelligent Learning Paths",
    description:
      "Personalized curricula that adapt as you grow — AI-generated paths, an always-on tutor, project-based practice, and progress tracking that keeps momentum honest.",
    href: "/features/learning",
    icon: GraduationCap,
    span: "lg:col-span-1 lg:row-span-1",
    highlights: [
      { icon: BookOpen, label: "AI Path Generation" },
      { icon: Bot, label: "AI Tutor Chatbot" },
      { icon: FolderKanban, label: "Project-Based Learning" },
      { icon: RefreshCw, label: "Dynamic Adaptation" },
    ],
    meta: `${learningFeatures} learning features`,
  },
  {
    id: "teams",
    eyebrow: "Pillar 03",
    title: "Strategic Business Intelligence",
    description:
      "Bring the same intelligence to teams — real-time skill insights, predictive analytics, goal alignment, and a Team Skill Matrix so leaders can see capability at a glance.",
    href: "/features/teams",
    icon: BarChart3,
    span: "lg:col-span-1 lg:row-span-1",
    highlights: [
      { icon: LineChart, label: "Real-time insights" },
      { icon: Activity, label: "Predictive analytics" },
      { icon: Target, label: "Goal alignment" },
      { icon: Users, label: "Team Skill Matrix" },
    ],
    meta: "Enterprise-grade analytics",
  },
];

const stats: { value: string; label: string }[] = [
  { value: `${totalFeatures}`, label: "AI features in the platform" },
  { value: `${readyFeatures}`, label: "Live and ready to use" },
  { value: `${comingSoonFeatures}`, label: "Coming soon" },
  { value: "3", label: "Product pillars" },
];

function PillarCard({ pillar }: { pillar: Pillar }) {
  const Icon = pillar.icon;
  return (
    <Link
      href={pillar.href}
      className={`${pillar.span} group rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
      aria-label={`${pillar.title} — ${pillar.meta}`}
    >
      <Card
        variant="default"
        className="relative flex h-full flex-col gap-6 overflow-hidden p-7 shadow-elevation-1 transition-shadow duration-300 ease-out hover:shadow-elevation-4 group-focus-visible:shadow-elevation-4 motion-safe:transition-[box-shadow,transform] motion-safe:group-hover:-translate-y-1"
      >
        {/* Token-only accent wash that intensifies on hover. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-accent-subtle opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        <div className="relative flex h-full flex-col gap-6">
          <div className="flex items-start justify-between gap-4">
            <span
              aria-hidden="true"
              className="inline-flex size-12 shrink-0 items-center justify-center rounded-lg bg-accent-subtle text-accent [&_svg]:size-6"
            >
              <Icon />
            </span>
            <Badge variant="neutral" size="md">
              {pillar.meta}
            </Badge>
          </div>

          <Stack gap={3}>
            <p className="text-overline text-accent">{pillar.eyebrow}</p>
            <h2 className="text-h3 text-balance text-foreground">
              {pillar.title}
            </h2>
            <p className="text-body-sm text-pretty text-muted-foreground">
              {pillar.description}
            </p>
          </Stack>

          {/* Representative, real features for this pillar. */}
          <ul className="mt-auto flex flex-wrap gap-2" aria-label="Highlights">
            {pillar.highlights.map(({ icon: HIcon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full bg-muted-surface px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                <HIcon aria-hidden="true" className="size-3.5" />
                {label}
              </li>
            ))}
          </ul>

          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            Explore {pillar.title.split(" ")[0]}
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1"
            />
          </span>
        </div>
      </Card>
    </Link>
  );
}

export default function FeaturesHubPage() {
  return (
    <>
      <Section className="relative isolate overflow-hidden">
        {/* Token-driven aurora backdrop — CSS vars + color-mix only, no raw color. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: [
              "radial-gradient(60% 60% at 18% 0%, color-mix(in oklab, var(--primary) 12%, transparent) 0%, transparent 60%)",
              "radial-gradient(50% 50% at 85% 8%, color-mix(in oklab, var(--accent) 16%, transparent) 0%, transparent 55%)",
            ].join(", "),
          }}
        />
        <Stack gap={6} align="center" className="mx-auto max-w-3xl text-center">
          <Badge
            variant="info"
            size="md"
            className="inline-flex items-center gap-1.5"
          >
            <Sparkles aria-hidden="true" className="size-3.5" />
            {totalFeatures} AI features across 3 pillars
          </Badge>
          <PageHeader
            className="items-center [&_p]:mx-auto [&_p]:max-w-2xl"
            eyebrow="Platform overview"
            title="The most complete professional toolkit, in three pillars"
            subtitle="Kairoo unifies career development, intelligent learning, and team-level business intelligence into one AI-powered command center. Start with a pillar and dive into the tools that move your work forward."
          />
        </Stack>
      </Section>

      {/* Three pillars — accessible Card links in a bento-style grid. */}
      <Section className="pt-0">
        <div className="grid auto-rows-[minmax(15rem,1fr)] grid-cols-1 gap-5 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <PillarCard key={pillar.id} pillar={pillar} />
          ))}
        </div>
      </Section>

      {/* Real product facts — derived from the registry, no projections. */}
      <Section className="pt-0">
        <Card variant="elevated" className="p-8 sm:p-10">
          <Grid cols={4} gap="lg" className="text-center">
            {stats.map((stat) => (
              <Stack key={stat.label} gap={1} align="center">
                <span className="text-h1 font-bold text-foreground">
                  {stat.value}
                </span>
                <span className="text-body-sm text-muted-foreground">
                  {stat.label}
                </span>
              </Stack>
            ))}
          </Grid>
        </Card>
      </Section>

      <Section className="pt-0">
        <CTA
          headline="One platform, every professional moment"
          body="Explore the full library of AI features, or jump straight to the pillar that matches your goal."
          primary={{ label: "Browse career tools", href: "/features/career" }}
          secondary={{ label: "See pricing", href: "/pricing" }}
        />
      </Section>
    </>
  );
}
