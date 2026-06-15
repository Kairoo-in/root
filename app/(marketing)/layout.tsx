import PublicNav from "@/components/shells/PublicNav";
import Footer from "@/components/shells/Footer";
import AuroraBackground from "@/components/motion/AuroraBackground";
import { StickyBanner } from "@/components/aceternity";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuroraBackground className="pointer-events-none" />
      <StickyBanner storageKey="kairoo-rebrand-banner-dismissed"><strong>AstraPath AI is now Kairoo.</strong> Same mission — the right moment to grow.</StickyBanner>
      <PublicNav />
      <main className="min-h-screen pt-16">{children}</main>
      <Footer />
    </>
  );
}
