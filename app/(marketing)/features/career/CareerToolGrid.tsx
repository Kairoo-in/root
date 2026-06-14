"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Grid } from "@/components/layout/Grid";
import { Stack } from "@/components/layout/Stack";
import IconRenderer from "@/components/IconRenderer";

/**
 * A single career tool, projected from the AI feature registry. Kept to the
 * minimal display shape so this component never depends on prompt-builder
 * internals — only what the catalog card needs to render.
 */
export interface CareerToolCard {
  id: string;
  name: string;
  description: string;
  icon: string;
  ready: boolean;
}

export interface CareerToolGridProps {
  tools: CareerToolCard[];
}

/**
 * Token-only, reduced-motion-safe catalog grid. Each card shows the tool name,
 * description, and icon; tools that are not yet `ready` carry a "Coming soon"
 * badge. Reveal animation is disabled entirely when the user prefers reduced
 * motion (cards render in their final state, no transform).
 */
export function CareerToolGrid({ tools }: CareerToolGridProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const animate = !reduceMotion;

  return (
    <div ref={ref}>
      <Grid cols={3} gap="lg">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={animate ? { opacity: 0, y: 24 } : false}
            animate={
              animate ? (inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }) : undefined
            }
            transition={
              animate
                ? { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: Math.min(index * 0.04, 0.4) }
                : undefined
            }
          >
            <Card variant="interactive" className="h-full p-6">
              <Stack gap={4}>
                <div className="flex items-start justify-between gap-3">
                  <span
                    aria-hidden="true"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent-subtle text-accent"
                  >
                    <IconRenderer name={tool.icon} size={22} />
                  </span>
                  {!tool.ready ? (
                    <Badge variant="warning" size="sm">
                      Coming soon
                    </Badge>
                  ) : null}
                </div>
                <Stack gap={2}>
                  <h3 className="text-h4 text-foreground">{tool.name}</h3>
                  <p className="text-body-sm text-muted-foreground">{tool.description}</p>
                </Stack>
              </Stack>
            </Card>
          </motion.div>
        ))}
      </Grid>
    </div>
  );
}

export default CareerToolGrid;
