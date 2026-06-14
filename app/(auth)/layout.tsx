import Link from "next/link";
import Logo from "@/components/Logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      {/* Subtle token aurora — uses CSS vars so it adapts to light/dark */}
      <div aria-hidden className="auth-aurora pointer-events-none fixed inset-0 -z-10" />

      {/* Logo mark */}
      <div className="mb-8">
        <Link href="/" aria-label="Go to homepage">
          <Logo size={36} />
        </Link>
      </div>

      {/* Clerk card renders here */}
      <div className="w-full max-w-md">
        {children}
      </div>

      {/* Footer note */}
      <p className="mt-8 text-center text-body-sm text-muted-foreground">
        By continuing, you agree to Kairoo&apos;s{" "}
        <Link href="/legal/terms" className="underline underline-offset-2 hover:text-foreground transition-colors">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="/legal/privacy" className="underline underline-offset-2 hover:text-foreground transition-colors">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
