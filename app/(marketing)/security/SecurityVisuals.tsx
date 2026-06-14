"use client";

/* -------------------------------------------------------------------------- */
/*  Security & Trust — client visuals                                           */
/*                                                                             */
/*  All interactive / animated sections live here so page.tsx stays a pure      */
/*  server component with `export const metadata`. Data crosses the RSC          */
/*  boundary as plain serializable values only (strings, numbers, arrays) —     */
/*  icons are passed as NAME strings and rendered via <IconRenderer>, never as  */
/*  lucide component references (that previously broke prerender with           */
/*  "Refs cannot be passed to Client Components").                              */
/* -------------------------------------------------------------------------- */

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants, type MotionProps } from "motion/react";
import { animate, stagger } from "animejs";

import { cn } from "@/lib/utils";
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Tooltip } from "@/components/ui/Tooltip";
import { Separator } from "@/components/ui/Separator";
import IconRenderer from "@/components/IconRenderer";
import { Spotlight } from "@/components/motion/Spotlight";
import { CardSpotlight } from "@/components/blocks/CardSpotlight";
import {
  CardContainer,
  CardBody,
  CardItem,
} from "@/components/motion/ThreeDCard";
import { StatGrid, type StatCounterProps } from "@/components/blocks/StatCounter";

/* ------------------------------- types ----------------------------------- */

export type LayerVM = {
  title: string;
  icon: string;
  summary: string;
  controls: string[];
  /** Bento footprint on the lg grid. */
  span: "wide" | "tall" | "cell";
};

export type ComplianceVM = {
  name: string;
  scope: string;
  posture: string;
  status: "in-progress" | "aligned";
  statusLabel: string;
  statusIcon: string;
  statusVariant: "info" | "success";
};

export type PracticeVM = {
  title: string;
  icon: string;
  description: string;
};

export type TargetVM = {
  metric: string;
  target: string;
  note: string;
};

/* ----------------------------- motion config ------------------------------ */

const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

/* =========================================================================== */
/*  HERO — Spotlight + animated shield/lock motif + anime.js headline          */
/* =========================================================================== */

export function SecurityHero({
  eyebrow,
  titleLead,
  titleHighlight,
  titleTail,
  subtitle,
  primaryCta,
  secondaryCta,
  badges,
}: {
  eyebrow: string;
  titleLead: string;
  titleHighlight: string;
  titleTail: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  /** Small trust chips beneath the CTAs. */
  badges: { icon: string; label: string }[];
}) {
  const reduce = useReducedMotion();
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const node = headlineRef.current;
    if (reduce || !node) return;
    const targets = node.querySelectorAll<HTMLElement>("[data-hero-word]");
    if (!targets.length) return;

    targets.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(0.45em)";
    });

    const animation = animate(targets, {
      opacity: [0, 1],
      translateY: ["0.45em", "0em"],
      duration: 760,
      delay: stagger(60, { start: 120 }),
      ease: "out(3)",
    });

    return () => {
      animation.cancel();
    };
  }, [reduce]);

  const words = `${titleLead} ${titleHighlight} ${titleTail}`.trim().split(" ");
  const highlightStart = titleLead.trim() ? titleLead.trim().split(" ").length : 0;
  const highlightEnd = highlightStart + titleHighlight.trim().split(" ").length;

  return (
    <Section className="relative isolate overflow-hidden">
      {/* Aceternity Spotlight sweeping in from the top-left. */}
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" />

      {/* Token-driven aurora backdrop (teal -> navy), color-mix only. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: [
            "radial-gradient(60% 60% at 18% 0%, color-mix(in oklab, var(--primary) 16%, transparent) 0%, transparent 60%)",
            "radial-gradient(50% 50% at 85% 8%, color-mix(in oklab, var(--accent) 20%, transparent) 0%, transparent 55%)",
            "radial-gradient(70% 70% at 50% 120%, color-mix(in oklab, var(--primary) 12%, transparent) 0%, transparent 60%)",
          ].join(", "),
        }}
      />
      {/* Fine dotted grid for depth — fades into the background. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] [mask-image:radial-gradient(60%_50%_at_50%_30%,black,transparent)]"
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in oklab, var(--foreground) 22%, transparent) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        {/* ---- copy column ---- */}
        <Stack gap={8} align="start" className="max-w-2xl py-6 text-left sm:py-10">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <Badge variant="info" size="md" className="gap-1.5">
              <IconRenderer name="shield-check" size={13} />
              {eyebrow}
            </Badge>
          </motion.div>

          <h1 ref={headlineRef} className="text-display text-balance">
            {words.map((w, i) => {
              const isHighlight = i >= highlightStart && i < highlightEnd;
              return (
                <span
                  key={`${w}-${i}`}
                  data-hero-word
                  className={cn(
                    "inline-block",
                    i < words.length - 1 && "mr-[0.25em]",
                    isHighlight && "gradient-text",
                  )}
                >
                  {w}
                </span>
              );
            })}
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.55 }}
            className="max-w-xl text-body-lg text-muted-foreground"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.68 }}
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <motion.div
              whileHover={reduce ? undefined : { scale: 1.03 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
            >
              <Button asChild size="lg">
                <Link href={primaryCta.href}>
                  {primaryCta.label}
                  <IconRenderer name="arrow-right" size={18} />
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={reduce ? undefined : { scale: 1.03 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
            >
              <Button asChild size="lg" variant="outline">
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.ul
            initial={reduce ? false : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.85 }}
            className="flex flex-wrap gap-x-5 gap-y-2"
          >
            {badges.map((b) => (
              <li
                key={b.label}
                className="inline-flex items-center gap-1.5 text-caption text-muted-foreground"
              >
                <span className="text-accent">
                  <IconRenderer name={b.icon} size={14} />
                </span>
                {b.label}
              </li>
            ))}
          </motion.ul>
        </Stack>

        {/* ---- animated shield / lock motif ---- */}
        <ShieldMotif />
      </div>
    </Section>
  );
}

/**
 * ShieldMotif — a layered, animated trust crest: concentric scanning rings
 * orbiting a glassy shield with a pulsing lock at its core. Pure transform +
 * opacity, token-only colors, fully neutralized under reduced-motion.
 */
function ShieldMotif() {
  const reduce = useReducedMotion();

  const ring = (delay: number): MotionProps =>
    reduce
      ? {}
      : {
          animate: { rotate: 360 },
          transition: { duration: 26 + delay * 6, ease: "linear", repeat: Infinity },
        };

  const counterRing: MotionProps = reduce
    ? {}
    : {
        animate: { rotate: -360 },
        transition: { duration: 34, ease: "linear", repeat: Infinity },
      };

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.9 }}
      animate={reduce ? undefined : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
      className="relative mx-auto hidden aspect-square w-full max-w-sm place-items-center lg:grid"
      aria-hidden
    >
      {/* ambient glow */}
      <div
        className="absolute inset-6 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--accent) 28%, transparent), transparent 70%)",
        }}
      />

      {/* orbiting dashed rings */}
      <motion.div
        {...ring(0)}
        className="absolute inset-0 rounded-full border border-dashed"
        style={{ borderColor: "color-mix(in oklab, var(--primary) 35%, transparent)" }}
      />
      <motion.div
        {...counterRing}
        className="absolute inset-8 rounded-full border"
        style={{ borderColor: "color-mix(in oklab, var(--accent) 30%, transparent)" }}
      >
        {/* a node riding the ring */}
        <span
          className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-accent"
          style={{ boxShadow: "0 0 12px color-mix(in oklab, var(--accent) 70%, transparent)" }}
        />
      </motion.div>
      <motion.div
        {...ring(2)}
        className="absolute inset-16 rounded-full border border-dashed"
        style={{ borderColor: "color-mix(in oklab, var(--warning) 32%, transparent)" }}
      />

      {/* center shield (3D tilt on hover) */}
      <CardContainer containerClassName="py-0">
        <CardBody className="relative grid size-44 place-items-center">
          <CardItem
            translateZ={60}
            className="grid size-44 place-items-center rounded-[2rem] border"
            style={{
              borderColor: "color-mix(in oklab, var(--accent) 35%, transparent)",
              background:
                "linear-gradient(160deg, color-mix(in oklab, var(--primary) 20%, var(--card)), color-mix(in oklab, var(--accent) 14%, var(--card)))",
              boxShadow:
                "0 24px 60px -20px color-mix(in oklab, var(--primary) 45%, transparent)",
            }}
          >
            <CardItem translateZ={100} className="text-accent">
              <IconRenderer name="shield-check" size={64} />
            </CardItem>
          </CardItem>

          {/* pulsing lock badge at the corner */}
          <CardItem
            translateZ={120}
            className="absolute -bottom-3 -right-3"
          >
            <motion.span
              animate={reduce ? undefined : { scale: [1, 1.12, 1] }}
              transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
              className="grid size-12 place-items-center rounded-2xl text-primary-foreground"
              style={{
                background: "var(--primary)",
                boxShadow:
                  "0 0 0 4px color-mix(in oklab, var(--primary) 22%, transparent)",
              }}
            >
              <IconRenderer name="lock-keyhole" size={22} />
            </motion.span>
          </CardItem>
        </CardBody>
      </CardContainer>
    </motion.div>
  );
}

/* =========================================================================== */
/*  STATS — animated count-up band of performance targets                      */
/* =========================================================================== */

export function SecurityStats({
  eyebrow,
  heading,
  subtitle,
  stats,
}: {
  eyebrow: string;
  heading: string;
  subtitle: string;
  stats: StatCounterProps[];
}) {
  const reduce = useReducedMotion();
  return (
    <Section className="pt-0">
      <Stack gap={8}>
        <motion.header
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="max-w-2xl"
        >
          <p className="text-overline text-primary">{eyebrow}</p>
          <h2 className="text-h2 text-foreground">{heading}</h2>
          <p className="mt-3 text-body-lg text-muted-foreground">{subtitle}</p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Card variant="glass" className="relative overflow-hidden p-8 sm:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(120deg, color-mix(in oklab, var(--primary) 10%, transparent), transparent 45%, color-mix(in oklab, var(--accent) 12%, transparent))",
              }}
            />
            <StatGrid items={stats} cols={4} gap="lg" className="relative" />
          </Card>
        </motion.div>
      </Stack>
    </Section>
  );
}

/* =========================================================================== */
/*  LAYERS — defense-in-depth as an asymmetric Bento of CardSpotlight cells     */
/* =========================================================================== */

const layerSpan: Record<LayerVM["span"], string> = {
  wide: "lg:col-span-2",
  tall: "lg:row-span-2",
  cell: "",
};

export function SecurityLayers({
  eyebrow,
  heading,
  subtitle,
  layers,
}: {
  eyebrow: string;
  heading: string;
  subtitle: string;
  layers: LayerVM[];
}) {
  const reduce = useReducedMotion();
  return (
    <Section className="pt-0" aria-labelledby="layers-heading">
      <Stack gap={10}>
        <motion.header
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="max-w-2xl"
        >
          <p className="text-overline text-primary">{eyebrow}</p>
          <h2 id="layers-heading" className="text-h2 text-foreground">
            {heading}
          </h2>
          <p className="mt-3 text-body-lg text-muted-foreground">{subtitle}</p>
        </motion.header>

        <motion.div
          variants={containerVariants}
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {layers.map((layer) => (
            <motion.div
              key={layer.title}
              variants={itemVariants}
              className={cn("flex", layerSpan[layer.span])}
            >
              <CardSpotlight className="flex h-full w-full flex-col gap-5 rounded-xl border-border bg-card p-7">
                <motion.span
                  aria-hidden
                  whileHover={reduce ? undefined : { rotate: -6, scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="inline-flex size-12 items-center justify-center rounded-xl text-accent"
                  style={{
                    background: "color-mix(in oklab, var(--accent) 14%, transparent)",
                    boxShadow:
                      "0 0 0 1px color-mix(in oklab, var(--accent) 28%, transparent)",
                  }}
                >
                  <IconRenderer name={layer.icon} size={24} />
                </motion.span>

                <Stack gap={2}>
                  <h3 className="text-h4 text-foreground">{layer.title}</h3>
                  <p className="text-body-sm text-muted-foreground">{layer.summary}</p>
                </Stack>

                <ul className="mt-auto flex flex-col gap-2 border-t border-border pt-4">
                  {layer.controls.map((control) => (
                    <li
                      key={control}
                      className="flex items-start gap-2 text-body-sm text-foreground"
                    >
                      <span className="mt-0.5 shrink-0 text-success">
                        <IconRenderer name="check-circle" size={16} />
                      </span>
                      <span>{control}</span>
                    </li>
                  ))}
                </ul>
              </CardSpotlight>
            </motion.div>
          ))}
        </motion.div>
      </Stack>
    </Section>
  );
}

/* =========================================================================== */
/*  PRACTICES — ThreeDCard tilt grid of operating principles                   */
/* =========================================================================== */

export function SecurityPractices({
  eyebrow,
  heading,
  subtitle,
  practices,
}: {
  eyebrow: string;
  heading: string;
  subtitle: string;
  practices: PracticeVM[];
}) {
  const reduce = useReducedMotion();
  return (
    <Section
      className="relative overflow-hidden bg-muted-surface"
      aria-labelledby="practices-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 0%, color-mix(in oklab, var(--accent) 10%, transparent), transparent 60%)",
        }}
      />
      <Stack gap={10}>
        <motion.header
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="max-w-2xl"
        >
          <p className="text-overline text-primary">{eyebrow}</p>
          <h2 id="practices-heading" className="text-h2 text-foreground">
            {heading}
          </h2>
          <p className="mt-3 text-body-lg text-muted-foreground">{subtitle}</p>
        </motion.header>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {practices.map((practice, i) => (
            <motion.div
              key={practice.title}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.07 }}
            >
              <CardContainer containerClassName="py-0">
                <CardBody className="group/card relative h-full w-full rounded-xl border border-border bg-card p-7">
                  <CardItem
                    translateZ={50}
                    className="inline-flex size-11 items-center justify-center rounded-lg text-accent"
                    style={{
                      background: "color-mix(in oklab, var(--accent) 14%, transparent)",
                    }}
                  >
                    <IconRenderer name={practice.icon} size={20} />
                  </CardItem>
                  <CardItem
                    as="h3"
                    translateZ={40}
                    className="mt-4 text-h5 text-foreground"
                  >
                    {practice.title}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ={20}
                    className="mt-2 text-body-sm text-muted-foreground"
                  >
                    {practice.description}
                  </CardItem>
                </CardBody>
              </CardContainer>
            </motion.div>
          ))}
        </div>
      </Stack>
    </Section>
  );
}

/* =========================================================================== */
/*  COMPLIANCE — animated posture cards + procurement callout                   */
/* =========================================================================== */

export function SecurityCompliance({
  eyebrow,
  heading,
  subtitle,
  items,
  callout,
}: {
  eyebrow: string;
  heading: string;
  subtitle: string;
  items: ComplianceVM[];
  callout: { body: string; cta: { label: string; href: string } };
}) {
  const reduce = useReducedMotion();
  return (
    <Section className="pt-0" aria-labelledby="compliance-heading">
      <Stack gap={10}>
        <motion.header
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="max-w-2xl"
        >
          <p className="text-overline text-primary">{eyebrow}</p>
          <h2 id="compliance-heading" className="text-h2 text-foreground">
            {heading}
          </h2>
          <p className="mt-3 text-body-lg text-muted-foreground">{subtitle}</p>
        </motion.header>

        <motion.div
          variants={containerVariants}
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2"
        >
          {items.map((item) => (
            <motion.div key={item.name} variants={itemVariants} className="flex">
              <Card
                variant="interactive"
                className="relative flex h-full w-full flex-col gap-4 overflow-hidden p-6"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, color-mix(in oklab, var(--accent) 70%, transparent), transparent)",
                  }}
                />
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="inline-flex size-10 items-center justify-center rounded-lg text-accent"
                      style={{
                        background:
                          "color-mix(in oklab, var(--accent) 14%, transparent)",
                      }}
                    >
                      <IconRenderer name="file-check-2" size={20} />
                    </span>
                    <h3 className="text-h4 text-foreground">{item.name}</h3>
                  </div>
                  <Badge variant={item.statusVariant} className="gap-1">
                    <IconRenderer name={item.statusIcon} size={12} />
                    {item.statusLabel}
                  </Badge>
                </div>
                <p className="text-body-sm font-medium text-foreground">{item.scope}</p>
                <p className="text-body-sm text-muted-foreground">{item.posture}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <Card
            variant="elevated"
            className="relative flex flex-col gap-5 overflow-hidden p-7 sm:flex-row sm:items-center sm:justify-between"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(110deg, color-mix(in oklab, var(--primary) 8%, transparent), transparent 55%, color-mix(in oklab, var(--accent) 10%, transparent))",
              }}
            />
            <div className="relative flex items-start gap-4">
              <span
                aria-hidden
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg text-primary"
                style={{
                  background: "color-mix(in oklab, var(--primary) 14%, transparent)",
                }}
              >
                <IconRenderer name="shield-check" size={20} />
              </span>
              <p className="relative text-body-sm text-muted-foreground">{callout.body}</p>
            </div>
            <Tooltip delay={0}>
              <Button asChild variant="outline" className="relative shrink-0">
                <Link href={callout.cta.href}>
                  {callout.cta.label}
                  <IconRenderer name="arrow-right" size={16} />
                </Link>
              </Button>
              <Tooltip.Content showArrow placement="top">
                <Tooltip.Arrow />
                Get current docs &amp; a controls walkthrough
              </Tooltip.Content>
            </Tooltip>
          </Card>
        </motion.div>
      </Stack>
    </Section>
  );
}

/* =========================================================================== */
/*  PERFORMANCE + MONITORING — split panel with animated targets               */
/* =========================================================================== */

export function SecurityPerformance({
  eyebrow,
  heading,
  subtitle,
  targets,
  monitoring,
}: {
  eyebrow: string;
  heading: string;
  subtitle: string;
  targets: TargetVM[];
  monitoring: string[];
}) {
  const reduce = useReducedMotion();
  return (
    <Section className="pt-0" aria-labelledby="perf-heading">
      <Stack gap={10}>
        <motion.header
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="max-w-2xl"
        >
          <p className="text-overline text-primary">{eyebrow}</p>
          <h2 id="perf-heading" className="text-h2 text-foreground">
            {heading}
          </h2>
          <p className="mt-3 text-body-lg text-muted-foreground">{subtitle}</p>
        </motion.header>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:items-start">
          {/* speed targets */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <CardSpotlight className="h-full rounded-xl border-border bg-card p-7">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="inline-flex size-11 items-center justify-center rounded-lg text-accent"
                  style={{
                    background: "color-mix(in oklab, var(--accent) 14%, transparent)",
                  }}
                >
                  <IconRenderer name="gauge" size={22} />
                </span>
                <h3 className="text-h4 text-foreground">Speed targets</h3>
              </div>
              <motion.ul
                variants={containerVariants}
                initial={reduce ? false : "hidden"}
                whileInView={reduce ? undefined : "show"}
                viewport={{ once: true, amount: 0.2 }}
                className="mt-5 flex flex-col"
              >
                {targets.map((t, i) => (
                  <motion.li key={t.metric} variants={itemVariants}>
                    {i > 0 ? <Separator /> : null}
                    <div className="flex items-center justify-between gap-4 py-3">
                      <div>
                        <p className="text-body-sm font-medium text-foreground">
                          {t.metric}
                        </p>
                        <p className="text-caption text-muted-foreground">{t.note}</p>
                      </div>
                      <span className="text-data tabular-nums text-primary">
                        {t.target}
                      </span>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </CardSpotlight>
          </motion.div>

          {/* monitoring */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
          >
            <Card
              variant="glass"
              className="relative h-full overflow-hidden p-7"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(140deg, color-mix(in oklab, var(--primary) 8%, transparent), transparent 50%, color-mix(in oklab, var(--accent) 10%, transparent))",
                }}
              />
              <div className="relative flex items-center gap-3">
                <span
                  aria-hidden
                  className="inline-flex size-11 items-center justify-center rounded-lg text-accent"
                  style={{
                    background: "color-mix(in oklab, var(--accent) 14%, transparent)",
                  }}
                >
                  <IconRenderer name="activity" size={22} />
                </span>
                <h3 className="text-h4 text-foreground">Monitoring &amp; observability</h3>
              </div>
              <p className="relative mt-4 text-body-sm text-muted-foreground">
                We watch these targets continuously so regressions surface fast and get
                fixed before they affect you.
              </p>
              <Separator className="relative my-5" />
              <ul className="relative flex flex-col gap-3">
                {monitoring.map((m) => (
                  <li
                    key={m}
                    className="flex items-start gap-2 text-body-sm text-foreground"
                  >
                    <span className="mt-0.5 shrink-0 text-accent">
                      <IconRenderer name="scroll-text" size={16} />
                    </span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>
      </Stack>
    </Section>
  );
}
