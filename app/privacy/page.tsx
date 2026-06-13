import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";
import { legal } from "@/lib/legal/config";
import { privacy } from "@/lib/legal/content/privacy";

export const metadata: Metadata = { title: "Privacy Policy — Kairoo" };

export default function PrivacyPage() {
  return <LegalLayout title="Privacy Policy" body={privacy(legal)} />;
}
