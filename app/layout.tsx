import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import AnimatedBackground from "@/components/AnimatedBackground";
import FloatingThemeToggle from "@/components/FloatingThemeToggle";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AstraPath AI - Your AI-Powered Career & Learning Command Center",
  description: "Stop wasting time on scattered career resources. AstraPath AI merges advanced career development tools with intelligent learning systems and strategic business insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased transition-colors duration-500`}
        suppressHydrationWarning
      >
        <Providers>
          <AnimatedBackground />
          <FloatingThemeToggle />
          <div className="relative z-10 flex min-h-screen flex-col">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
