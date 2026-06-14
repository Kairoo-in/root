import { features as featureRegistry } from "@/engines/ai/features/registry";
import {
  FeaturesHero,
  PillarBento,
  FeatureStats,
  BenefitTabs,
  FeaturesCta,
  type PillarData,
  type StatData,
  type BenefitTab,
} from "./FeaturesVisuals";

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

// Three product pillars from the home Platform Overview (CONTENT-MAP §A).
// Highlights are real, shipping features pulled from the registry; counts are
// derived above. No aspirational numbers live on this public page.
// Icons are passed as NAME strings (resolved client-side via IconRenderer) so
// no component reference crosses the server→client boundary.
const pillars: PillarData[] = [
  {
    id: "career",
    title: "Career Development Suite",
    short: "Career",
    description:
      "The core of Kairoo: turn ambiguous goals into a sequenced plan and execute it with AI co-pilots for every high-stakes career moment — from roadmaps and interviews to salary conversations and performance reviews.",
    href: "/features/career",
    icon: "briefcase",
    span: "lg:col-span-2 lg:row-span-2",
    highlights: [
      { icon: "map", label: "Dynamic Roadmaps" },
      { icon: "mic", label: "Interview Coach" },
      { icon: "dollar-sign", label: "Salary Coach" },
      { icon: "clipboard-list", label: "Review Assistant" },
    ],
    meta: `${careerFeatures} career tools`,
  },
  {
    id: "learning",
    title: "Intelligent Learning Paths",
    short: "Learning",
    description:
      "Personalized curricula that adapt as you grow — AI-generated paths, an always-on tutor, project-based practice, and progress tracking that keeps momentum honest.",
    href: "/features/learning",
    icon: "graduation-cap",
    span: "lg:col-span-1 lg:row-span-1",
    highlights: [
      { icon: "book-open", label: "AI Path Generation" },
      { icon: "bot", label: "AI Tutor Chatbot" },
      { icon: "folder-kanban", label: "Project-Based Learning" },
      { icon: "refresh-cw", label: "Dynamic Adaptation" },
    ],
    meta: `${learningFeatures} learning features`,
  },
  {
    id: "teams",
    title: "Strategic Business Intelligence",
    short: "Teams",
    description:
      "Bring the same intelligence to teams — real-time skill insights, predictive analytics, goal alignment, and a Team Skill Matrix so leaders can see capability at a glance.",
    href: "/features/teams",
    icon: "bar-chart-3",
    span: "lg:col-span-1 lg:row-span-1",
    highlights: [
      { icon: "line-chart", label: "Real-time insights" },
      { icon: "activity", label: "Predictive analytics" },
      { icon: "target", label: "Goal alignment" },
      { icon: "users", label: "Team Skill Matrix" },
    ],
    meta: "Enterprise-grade analytics",
  },
];

const stats: StatData[] = [
  { value: totalFeatures, label: "AI features in the platform" },
  { value: readyFeatures, label: "Live and ready to use" },
  { value: comingSoonFeatures, label: "Coming soon" },
  { value: 3, label: "Product pillars" },
];

// Capability benefits, grouped by pillar — surfaced through interactive Tabs.
// All copy is product-true; icons are name strings.
const benefitTabs: BenefitTab[] = [
  {
    id: "career",
    label: "Career",
    items: [
      {
        icon: "map",
        title: "Dynamic Roadmaps",
        description:
          "Turn an ambiguous goal into a sequenced, week-by-week plan that adapts as you make progress.",
      },
      {
        icon: "mic",
        title: "Interview Coach",
        description:
          "Rehearse high-stakes interviews with an AI co-pilot that gives structured, role-specific feedback.",
      },
      {
        icon: "dollar-sign",
        title: "Salary Coach",
        description:
          "Walk into compensation conversations prepared, with framing and benchmarks tailored to your role.",
      },
    ],
  },
  {
    id: "learning",
    label: "Learning",
    items: [
      {
        icon: "book-open",
        title: "AI Path Generation",
        description:
          "Generate a personalized curriculum from any goal — sequenced into achievable, trackable steps.",
      },
      {
        icon: "bot",
        title: "Always-on AI Tutor",
        description:
          "Ask anything, anytime. A tutor chatbot that knows your path and meets you where you are.",
      },
      {
        icon: "folder-kanban",
        title: "Project-Based Practice",
        description:
          "Learn by building. Hands-on projects turn theory into demonstrable, portfolio-ready skill.",
      },
    ],
  },
  {
    id: "teams",
    label: "Teams",
    items: [
      {
        icon: "line-chart",
        title: "Real-time Skill Insights",
        description:
          "See live capability across the team — no spreadsheets, no stale snapshots, no guesswork.",
      },
      {
        icon: "activity",
        title: "Predictive Analytics",
        description:
          "Spot skill gaps and momentum risks before they become blockers, with forward-looking signals.",
      },
      {
        icon: "target",
        title: "Goal Alignment",
        description:
          "Connect individual growth to team objectives so every roadmap pulls in the same direction.",
      },
    ],
  },
];

export default function FeaturesHubPage() {
  return (
    <>
      <FeaturesHero
        titleLead="The most complete"
        titleHighlight="professional toolkit"
        titleTail="in three pillars"
        subtitle="Kairoo unifies career development, intelligent learning, and team-level business intelligence into one AI-powered command center. Start with a pillar and dive into the tools that move your work forward."
      />

      <PillarBento pillars={pillars} />

      <FeatureStats stats={stats} />

      <BenefitTabs
        heading="What each pillar unlocks"
        description="A representative slice of what's shipping today — switch pillars to see the tools that move your work forward."
        tabs={benefitTabs}
      />

      <FeaturesCta
        headline="One platform, every professional moment"
        body="Explore the full library of AI features, or jump straight to the pillar that matches your goal."
      />
    </>
  );
}
