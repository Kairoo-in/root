# Rebrand & Legal Foundation — Design Doc

**Date:** 2026-06-13
**Owner:** Eshank Tyagi (eshank@matters.ai)
**Current name:** AstraPath AI (to be replaced)
**Status:** In progress — Section 1 (Strategy) locked; Naming, Brand Identity, and Legal pending.

> This document is the single source of truth for the rebrand. Nothing decided in
> brainstorming should be lost — every decision is recorded here with its reasoning.

---

## 1. Audience & Monetization Strategy — ✅ LOCKED

### 1.1 The product (context)
An AI-powered career development & learning platform. Capabilities today: AI career
tools (interview coaching, salary negotiation, etc.), AI-curated learning paths,
team/workforce analytics, and strategic/market intelligence views. Built on Next.js 16,
React 19, TypeScript, Google Gemini. Currently mid-pivot from "bragging about
capabilities" toward shipping real, usable features.

### 1.2 Audience model — one platform, three doors, tiered

The product is **a single platform with tiered gating** (NOT three separate products).
The brand must "grow with the user": **free → pro → team**.

| Tier | Segment | Role in strategy | Monetization |
|------|---------|------------------|--------------|
| **Free** | Students, early-career, job seekers, career switchers | Acquisition engine / land-grab / word-of-mouth; solves cold-start | Free (funnel) |
| **Pro (paid, self-serve)** | Working professionals upskilling | Self-serve revenue, no sales call | Individual subscription |
| **Primary (revenue ceiling)** | Enterprises / teams (B2B) | Highest revenue, predictable contracts; land-and-expand from individual usage inside a company | Team/enterprise contracts |

**Primary audience = Enterprises/teams.** The brand is deliberately designed to *also*
welcome the individual working professional, with a genuine free tier underneath for
students / early-career / job seekers.

### 1.3 Why this strategy (reasoning captured)
- **Free tier** solves the cold-start problem: cheap acquisition, virality, and a pool of
  users who *become* paid professionals as their careers progress.
- **Pro tier** monetizes self-serve with premium/aspirational pricing and low churn.
- **Enterprise** is the revenue ceiling; individual/free usage *inside* a company becomes
  the wedge ("12 people at Acme already use this → here's a team plan"). Classic
  **freemium land-and-expand** (cf. Gloat, Torch, BetterUp).

### 1.4 Trade-offs acknowledged
- Enterprise-primary means **slower validation** (needs design partners + a sales motion),
  so the brand must stay usable by an *individual* (land-and-expand, not top-down only).
- B2B buyers will eventually require **DPA, security/compliance, GDPR specifics,
  sub-processor lists** — heavier legal than a consumer app (see Section 4).

### 1.5 Guardrails / things to improve (carry into build)
1. **Free must be a funnel, not a cost sink.** Design free around the moments users
   outgrow it (usage caps on AI tools, no analytics, no team features) so they *graduate*:
   job seeker → lands job → working professional → upsell.
2. **One product, three doors — not three products.** Single platform, tiered gating, to
   avoid fragmenting build effort (supports the "build real features" pivot).
3. **Name/identity must sit across all three** — must not scream "enterprise" OR "students."
   This is the core naming constraint.
4. **Free needs a guardrail** — student-email verification and/or usage caps, or Gemini/AI
   costs balloon. Pricing & brand pages must account for this.

### 1.6 Brand direction implied by strategy
A name + identity that feels **credible + aspirational, professional yet personal** —
premium enough for enterprises and pros, warm/approachable enough for individuals and
students. The unifying brand story is **"grows with you"** (free → pro → team).

---

## 2. Product Name — ✅ LOCKED: **Kairoo**

### 2.1 The name
**Kairoo** (replaces "AstraPath AI"). Style: invented/coined word (per owner preference —
fully ownable, trademarkable, meaning we control; drops the literal "AI" suffix per the
"stop bragging, build real features" pivot).

### 2.2 Meaning & story
Derived from Greek **_kairos_** — "the opportune moment," the right time to act. For a
career platform this reads as **"the right moment to grow / your next move."** The doubled
vowel ("-oo") makes the mark distinct and ownable while preserving the sound of the
original "Kairo" the owner was drawn to.

### 2.3 Why Kairoo (reasoning)
- **Spans all three audiences:** premium to enterprises, hopeful to job seekers, neither
  juvenile nor stiff.
- **Built-in brand story** = *"the right moment to grow,"* which dovetails with the
  "grows with you" thesis (free → pro → team) from Section 1.
- **Clear in our industry:** an availability scan (2026-06-13) found **no collision** in
  careers / HR-tech / edtech / learning / self-development.

### 2.4 Availability bar used
A name passes if: (1) **no collision in our industry** (careers / HR-tech / edtech /
learning / self-development), and (2) a **strong domain variant** is obtainable
(`kairoo.com`, `kairoo.io`, `getkairoo.com`, `usekairoo.com` — exact `.com` is a bonus,
not a requirement). Rationale: short "pretty" coined words from common roots are heavily
claimed; out-of-industry existence (e.g. a foreign health app) is a far smaller brand/legal
risk than an in-industry collision. **TODO before public launch:** formal trademark search
+ confirm chosen domain registration.

### 2.5 Candidates considered & rejected (2026-06-13 scan)
| Candidate | Verdict | Reason |
|-----------|---------|--------|
| Kairo | ❌ | Taken (owner found existing). |
| Lumora | ❌ | Lumora.io = personality-assessment / gamified self-dev — direct competitor collision. |
| Lunova | ❌ | Multiple AI software cos (Lunova Labs/Digital/Group) + Lumenova AI. |
| Veyra | ❌ | Swamped — many AI startups. |
| Cresca | ❌ | Cresça Brasil = UOL EdTech (distance education) — edtech adjacency. |
| Kaelo | ❌ | Kaelo Healthcare (SA) — well-being/psycho-social adjacency. |
| Aurelo | ❌ | Church-translation AI + ERP + studios — crowded. |
| Trayve | ❌ | Phonetically "thrive"; Thrive Career Wellness / Thryve exist in career-wellness. |
| Lumevo | ❌ | "Lum-" learning space crowded (Lumivero, Lumos Learning, Luminovo). |
| Ascentra | ❌ | Ascentis (talent management, now UKG) — essentially our exact space. |
| **Kairoo** | ✅ | **No in-industry collision; preserves loved "Kairo" sound; strong story.** |

### 2.6 Rebrand transition requirement (NEW)
Ship a **"AstraPath AI is now Kairoo" announcement banner / visual** so existing visitors
understand the rebrand. Scope to define in implementation:
- A dismissible site banner (top-of-page) with the rebrand message + optional "why we
  renamed" link.
- Optional shareable social/OG visual asset announcing the change.
- Persist dismissal (localStorage) so it doesn't nag returning users.
- Sunset the banner after a set period (e.g. 30–60 days) — candidate for a scheduled
  cleanup once a date is chosen.

---

## 3. Brand Identity — 🟡 IN PROGRESS

Overall direction: **blend of "Trusted Premium" (B) + "Warm Human" (C)** — navy anchor for
trust/enterprise, teal as the signature, amber for warmth. Personality: credible +
aspirational, professional yet personal. The palette itself signals tier ("grows with you").

### 3.1 Color system — ✅ LOCKED
| Token | Hex | Role |
|-------|-----|------|
| Navy | `#0B1F3A` | Brand anchor — text, enterprise tier, trust |
| Teal | `#0D9488` | Primary action color (signature), light mode |
| Teal-Bright | `#2DD4BF` | Primary action color, dark mode (contrast) |
| Amber | `#F59E0B` | Warmth + Free tier accent |
| Gold | `#CBA34A` | Enterprise-premium accent (used sparingly; optional) |
| Mist | `#F8FAFC` | Light background / surfaces |

**Tier accents (palette signals where you are):**
- **Free** → Amber (`#F59E0B`; badge bg `#FEF3C7`, text `#92400E`)
- **Pro** → Teal (`#0D9488`; badge bg `#CCFBF1`, text `#0F766E`)
- **Enterprise** → Navy + Gold (`#0B1F3A` / `#CBA34A`)

### 3.2 Themes — ✅ LOCKED
- **Light:** mostly white (`#FFFFFF`), mist surfaces (`#F8FAFC`), navy text, teal actions,
  hairline borders `#E2E8F0`.
- **Dark:** **navy-derived, NOT pure black** — bg `#071426`, surfaces `#0F2740`, borders
  `#16314F`, text `#F8FAFC` / muted `#94A3B8`, actions teal-bright `#2DD4BF`. Rationale:
  pure black reads generic; deep navy keeps the dark theme unmistakably Kairoo.

### 3.3 Typography — ⏳ PENDING

### 3.4 Logo / glyph — ✅ LOCKED (variant "B3")
The owner's original arc sweep with a small curved stem (reads as **K** on a second look)
and **two teal dots**: a small "waypoint" on the journey at the elbow, and the larger
"o" / *kairos* **moment** dot at the top of the arc. **All curves — no straight or edgy
lines** (hard requirement from owner). Origin: owner's own sketch, chosen over ~64 candidates.

SVG (viewBox `0 0 92 92`, stroke `#0B1F3A` light / `#F8FAFC` dark, width `8.05`, round caps;
dots `#0D9488` light / `#2DD4BF` dark):
```svg
<svg viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16.1016 71.2999C28.3682 68.2332 39.8682 59.0332 50.6016 43.6999C61.3349 28.3666 69.7682 19.9332 75.9016 18.3999" stroke="#0B1F3A" stroke-width="8.05" stroke-linecap="round"/>
  <path d="M32.0476 21C32.0476 39.55 30.9762 39.2 39 42" stroke="#0B1F3A" stroke-width="8.05" stroke-linecap="round"/>
  <circle cx="58" cy="51" r="5" fill="#0D9488"/>
  <circle cx="75.9016" cy="18.4" r="9.2" fill="#0D9488"/>
</svg>
```
- **Lockup:** glyph + "Kairoo" wordmark (bold, ~ -1.5px letter-spacing). Glyph also works standalone.
- **Favicon:** thicken stroke as size drops (8.05 → ~11 at 16px) so the mark survives; verified at 48/32/24/16.
- **App icon:** white/teal mark on navy tile, or white/amber on a navy→teal gradient tile.
- Asset work for implementation: export `public/` SVGs (light, dark, mono), favicon set, OG image, app-icon PNGs.
### 3.5 Voice & tone — ⏳ PENDING
### 3.6 Tagline — ⏳ PENDING (candidates: "The right moment to grow." / "AI career development that grows with you.")

---

## 4. Legal Pages — ⏳ PENDING

_Privacy Policy, Terms of Service, and B2B/freemium-specific docs (Cookie Policy, DPA stub,
sub-processors, acceptable-use). To be scoped. Note: observability + GA are being handled
separately by the owner later._

---

## Decisions log
- 2026-06-13: Scope = new name + full brand identity + legal pages. (Observability/GA out of scope — owner handling later.)
- 2026-06-13: Audience strategy locked (Section 1): Enterprise-primary, pro self-serve, free funnel for students/job seekers. One tiered platform, "grows with you."
- 2026-06-13: Name LOCKED = **Kairoo** (Section 2). 10 candidates scanned for in-industry collisions; Kairoo the only clean one that preserved the loved "Kairo" sound. Trademark + domain registration still TODO before public launch.
- 2026-06-13: Added requirement — "AstraPath AI is now Kairoo" rebrand announcement banner/visual (Section 2.6).
