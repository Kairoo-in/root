import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";
import { legal } from "@/lib/legal/config";
import { cookies } from "@/lib/legal/content/cookies";

export const metadata: Metadata = { title: "Cookie Policy — Kairoo" };

export default function CookiesPage() {
  return <LegalLayout title="Cookie Policy" body={cookies(legal)} />;
}
