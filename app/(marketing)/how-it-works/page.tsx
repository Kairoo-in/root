import type { Metadata } from "next";
import {
  Repeat,
  FileText,
  GitBranch,
  UserCheck,
  Gauge,
} from "lucide-react";

import { BentoGrid, type BentoItem } from "@/components/blocks/BentoGrid";
import { FAQ } from "@/components/blocks/FAQ";
import { CTA } from "@/components/blocks/CTA";
import type { StatCounterProps } from "@/components/blocks/StatCounter";

import {
  HowItWorksHero,
  HowItWorksStats,
  StepsTimeline,
  StackShowcase,
  type StepVM,
  type StackFactVM,
} from "./HowItWorksVisuals";

export const metadata: Metadata = {
  title: "How It Works — Sense, Think, Act | Kairoo",
  description:
    "See how Kairoo turns your goals into momentum: a Sense → Think → Act loop powered by Next.js and a Gemini-backed AI gateway, with you in control at every step.",
};

/* -------------------------------------------------------------------------- */
/*  Data — public-safe. Reflects the REAL stack (Next.js + engines/ai Gemini   */
/*  gateway). Deeper architecture is linked, not claimed, on this page.         */
/*  NOTE: icons cross into client components as NAME strings (IconRenderer      */
/*  keys), never as lucide component references — keeps prerender RSC-safe.     */
/* -------------------------------------------------------------------------- */

const STEPS: StepVM[] = [
  {
    id: "sense",
    index: "01",
    title: "Sense",
    tagline: "We start with your context",
    description:
      "Every tool begins by reading where you actually are — your goal, your role, your inputs. You paste a resume, describe a target role, or outline a team's skills, and Kairoo structures that into clean context the model can reason over.",
    icon: "satellite-dish",
    points: [
      "Typed inputs per tool — no blank-page guesswork",
      "Inputs stay scoped to the task you're running",
      "Works from what you have: text, goals, or a rough draft",
    ],
  },
  {
    id: "think",
    index: "02",
    title: "Think",
    tagline: "Our AI gateway does the reasoning",
    description:
      "Your context flows through the Kairoo AI engine — a server-side gateway built on Google's Gemini models. Each feature carries its own purpose-built prompt, so the model reasons against a clear objective instead of an open chat.",
    icon: "brain",
    points: [
      "Gemini-backed reasoning via the engines/ai gateway",
      "A dedicated, tuned prompt for every feature",
      "Runs on the server — your inputs never drive a raw chat box",
    ],
  },
  {
    id: "act",
    index: "03",
    title: "Act",
    tagline: "You get something you can use",
    description:
      "The result comes back as a concrete artifact — a roadmap, a negotiation script, a tailored learning path, a review draft. Keep it, refine it, or feed it into the next tool. The output is the starting point, not the finish line.",
    icon: "workflow",
    points: [
      "Structured, usable outputs — not just an answer",
      "Iterate: refine inputs and re-run in seconds",
      "Chain tools together as your goals evolve",
    ],
  },
];

// Headline metrics for the count-up band — sourced from public-safe FAQ copy.
const STATS: StatCounterProps[] = [
  { value: 3, label: "Steps in every loop" },
  { value: 35, suffix: "+", label: "AI tools live today" },
  { value: 1, label: "Unified AI gateway" },
  { value: 100, suffix: "%", label: "You stay in control" },
];

// The "see who's involved" loop — framed honestly as how the product behaves,
// not as aspirational infrastructure (that lives on /investors/architecture).
const LOOP_ITEMS: BentoItem[] = [
  {
    title: "One coherent flow",
    description:
      "Sense, Think, and Act aren't separate products — they're one loop you move through, with each output ready to become the next tool's input.",
    icon: <Repeat aria-hidden />,
    span: "2x2",
  },
  {
    title: "Purpose-built prompts",
    description:
      "Every feature ships with its own prompt and inputs, so the AI reasons toward a real outcome — not a generic reply.",
    icon: <FileText aria-hidden />,
    span: "2x1",
  },
  {
    title: "You stay in control",
    description: "Nothing ships on your behalf. You review, edit, and decide what to keep.",
    icon: <UserCheck aria-hidden />,
  },
  {
    title: "Modern, fast foundation",
    description: "Built on Next.js with a server-side AI gateway — responsive in the browser, reasoning on the backend.",
    icon: <Gauge aria-hidden />,
  },
  {
    title: "Designed to extend",
    description:
      "A single feature registry powers the catalog, so the toolkit grows without re-architecting how Sense → Think → Act works.",
    icon: <GitBranch aria-hidden />,
    span: "2x1",
  },
];

const STACK_FACTS: StackFactVM[] = [
  {
    title: "Next.js application layer",
    description:
      "The experience you interact with — pages, forms, and results — is a modern Next.js app, server-rendered for speed and reliability.",
    icon: "plug",
  },
  {
    title: "engines/ai gateway",
    description:
      "A single server-side gateway brokers every AI request through Google's Gemini models, keeping prompts, inputs, and behavior consistent across tools.",
    icon: "brain",
  },
  {
    title: "Privacy-minded by design",
    description:
      "Reasoning happens server-side and is scoped to the task you run. We frame our compliance posture as compliance-ready — building toward recognized standards, not over-claiming certification.",
    icon: "shield-check",
  },
];

const FAQ_ITEMS = [
  {
    id: "models",
    question: "What AI actually powers Kairoo?",
    answer:
      "Kairoo's reasoning runs through a server-side AI gateway built on Google's Gemini models. The app itself is built with Next.js. Each feature uses a purpose-built prompt rather than an open chat, so results stay focused on the task you're running.",
  },
  {
    id: "tools",
    question: "How many tools can I run through this loop?",
    answer:
      "The same Sense → Think → Act loop powers every feature in the Kairoo catalog — 35 AI tools are ready to use today across career and learning, with 3 more on the way. New tools plug into the same flow.",
  },
  {
    id: "control",
    question: "Does the AI take actions on its own?",
    answer:
      "No. Kairoo produces drafts and artifacts for you to review, edit, and decide on. The 'Act' step gives you something usable — you stay in control of what happens next.",
  },
  {
    id: "data",
    question: "What happens to the information I enter?",
    answer:
      "Inputs are scoped to the specific tool you run and processed server-side to generate your result. We take a privacy-minded, compliance-ready approach to how that data is handled.",
  },
  {
    id: "architecture",
    question: "Where can I see the deeper technical detail?",
    answer:
      "This page is the plain-language version. For the full system blueprint — ingestion, reasoning fabric, scaling, and roadmap — see the technical blueprint linked at the bottom of this page.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Page (server component — keeps `export const metadata`)                    */
/* -------------------------------------------------------------------------- */

export default function HowItWorksPage() {
  return (
    <>
      <HowItWorksHero
        eyebrow="How it works"
        words={["Sense", "Think", "Act"]}
        subtitle="Kairoo turns where you are into your next move through one simple loop — and a Gemini-backed AI engine does the heavy thinking, with you in control at every step."
        primaryCta={{ label: "Explore the tools", href: "/features" }}
        secondaryCta={{ label: "See pricing", href: "/pricing" }}
      />

      <HowItWorksStats stats={STATS} />

      {/* The three steps — the core narrative, as an animated stepped timeline. */}
      <StepsTimeline
        heading="Three steps, every single tool"
        subtitle="From a résumé to a negotiation script to a team's skill matrix — every Kairoo feature follows the same path. Once you know the loop, you know the whole product."
        steps={STEPS}
      />

      {/* The loop, expanded — Bento layout describing how the product behaves. */}
      <BentoGrid
        heading="Why the same flow works for everything"
        description="The loop is deliberately simple so the toolkit can grow without getting more complicated to use."
        items={LOOP_ITEMS}
      />

      {/* The real stack — honest, public-safe; deeper detail is linked, not claimed. */}
      <StackShowcase
        heading="The real stack behind the loop"
        subtitle="No mystery. Kairoo runs on a modern web foundation with a single AI gateway — here's the honest version."
        facts={STACK_FACTS}
        blueprint={{
          heading: "Want the full engineering picture?",
          body: "Signal ingestion, the reasoning fabric, the action layer, scaling and roadmap — the complete system blueprint lives with our technical deep-dive.",
          cta: { label: "See technical blueprint", href: "/investors/architecture" },
        }}
      />

      <FAQ
        title="How the loop works in practice"
        items={FAQ_ITEMS}
      />

      <CTA
        headline="Run your first loop"
        body="Pick a goal, give Kairoo the context, and get something you can use in minutes."
        primary={{ label: "Browse the toolkit", href: "/features" }}
        secondary={{ label: "Compare plans", href: "/pricing" }}
      />
    </>
  );
}
