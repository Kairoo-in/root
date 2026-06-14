import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Briefcase, MessageSquare, CalendarClock, ArrowRight } from "lucide-react";

import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { Stack } from "@/components/layout/Stack";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CTA } from "@/components/blocks/CTA";
import { FAQ } from "@/components/blocks/FAQ";
import { site } from "@/config/site";
import { routes } from "@/config/routes";
import type { FAQItem } from "@/types";

import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Kairoo — Talk to us or book a demo",
  description:
    "Get in touch with the Kairoo team. Send a message, book a product demo, reach support, or connect with investor relations.",
};

/**
 * Contact + demo page. Public-safe per CONTENT-MAP §6 (honest-public): no
 * fabricated metrics. Relocates the `/contact` IA unit (CONTENT-MAP §2/§3 —
 * "Contact + demo scheduling"). Support email + investor relations link are
 * sourced from @/config/site so they stay in sync.
 */

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "demo",
    question: "What happens after I request a demo?",
    answer:
      "We'll reply by email to find a time that works, then walk you through Kairoo's career toolkit, learning paths, and team analytics — focused on your goals and team size.",
  },
  {
    id: "trial",
    question: "Do I need to talk to anyone to try Kairoo?",
    answer:
      "No. The Free plan lets you start on your own with one active career path and weekly AI check-ins. Reach out here when you want a guided tour or are evaluating Pro or Enterprise.",
  },
  {
    id: "support",
    question: "I'm an existing user with a question — where do I go?",
    answer:
      `Email our support team at ${site.supportEmail} and we'll help you out. This form works too; it just routes to the same place.`,
  },
  {
    id: "investors",
    question: "I'm an investor or partner. Who should I contact?",
    answer:
      `For investor relations and partnership inquiries, email ${site.investorEmail} or visit the investor relations hub linked on this page.`,
  },
];

export default function ContactPage() {
  return (
    <>
      <Section>
        <PageHeader
          eyebrow="Contact"
          title="Talk to us, or book a demo"
          subtitle="Whether you're evaluating Kairoo for yourself or rolling it out across a team, send a note and we'll get back to you — usually within one business day."
        />
      </Section>

      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
          {/* Form column */}
          <Card variant="elevated" className="p-6 sm:p-8">
            <Stack gap={6}>
              <div className="flex flex-col gap-2">
                <h2 className="text-h3 text-foreground">Send us a message</h2>
                <p className="text-body text-muted-foreground">
                  Tell us a little about what you&apos;re trying to do and
                  we&apos;ll point you to the right next step.
                </p>
              </div>
              <ContactForm />
            </Stack>
          </Card>

          {/* Alternate contact info column */}
          <aside aria-label="Other ways to reach us">
            <Stack gap={4}>
              <Card variant="default" className="p-6">
                <Stack gap={3}>
                  <span
                    aria-hidden
                    className="inline-flex size-10 items-center justify-center rounded-lg bg-accent-subtle text-primary"
                  >
                    <MessageSquare className="size-5" />
                  </span>
                  <h3 className="text-h5 text-foreground">Support</h3>
                  <p className="text-body-sm text-muted-foreground">
                    Already using Kairoo? We&apos;re here to help.
                  </p>
                  <a
                    href={`mailto:${site.supportEmail}`}
                    className="inline-flex items-center gap-2 text-body-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                  >
                    <Mail aria-hidden className="size-4" />
                    {site.supportEmail}
                  </a>
                </Stack>
              </Card>

              <Card variant="default" className="p-6">
                <Stack gap={3}>
                  <span
                    aria-hidden
                    className="inline-flex size-10 items-center justify-center rounded-lg bg-accent-subtle text-primary"
                  >
                    <CalendarClock className="size-5" />
                  </span>
                  <h3 className="text-h5 text-foreground">Book a demo</h3>
                  <p className="text-body-sm text-muted-foreground">
                    Use the form and mention your team size — we&apos;ll set up a
                    guided walkthrough tailored to your goals.
                  </p>
                </Stack>
              </Card>

              <Card variant="interactive" className="p-6">
                <Stack gap={3}>
                  <div className="flex items-center justify-between">
                    <span
                      aria-hidden
                      className="inline-flex size-10 items-center justify-center rounded-lg bg-accent-subtle text-primary"
                    >
                      <Briefcase className="size-5" />
                    </span>
                    <Badge>Investors</Badge>
                  </div>
                  <h3 className="text-h5 text-foreground">Investor relations</h3>
                  <p className="text-body-sm text-muted-foreground">
                    Exploring an investment or partnership? Reach our IR team or
                    review the investor materials.
                  </p>
                  <a
                    href={`mailto:${site.investorEmail}`}
                    className="inline-flex items-center gap-2 text-body-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                  >
                    <Mail aria-hidden className="size-4" />
                    {site.investorEmail}
                  </a>
                  <Link
                    href={routes.investors}
                    className="inline-flex items-center gap-1 text-body-sm font-medium text-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                  >
                    Visit investor relations
                    <ArrowRight aria-hidden className="size-4" />
                  </Link>
                </Stack>
              </Card>
            </Stack>
          </aside>
        </div>
      </Section>

      <FAQ
        eyebrow="FAQ"
        title="Before you reach out"
        items={FAQ_ITEMS}
        subtitle="A few quick answers that might save you a message."
      />

      <CTA
        headline="Ready to see Kairoo in action?"
        body="Start free in minutes, or send a message above to set up a guided demo for your team."
        primary={{ label: "Get started free", href: routes.pricing }}
        secondary={{ label: "Explore features", href: routes.features }}
      />
    </>
  );
}
