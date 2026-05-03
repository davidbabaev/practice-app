import type { Metadata } from "next";
import Link from "next/link";
import { SignupForm } from "./SignupForm";

export const metadata: Metadata = {
  title: "Join Pulse · Pulse",
  description:
    "Sign up for the social network that doesn't sell your attention.",
};

export default function JoinPage() {
  return (
    <main className="flex flex-1 items-center justify-center bg-neutral-950 px-6 py-16 font-sans text-neutral-50">
      <section className="flex w-full max-w-xl flex-col items-center text-center">
        <Link
          href="/"
          className="self-start text-sm text-neutral-400 transition-colors hover:text-neutral-200"
        >
          ← Pulse
        </Link>
        <h1 className="mt-8 text-4xl font-semibold tracking-tight sm:text-5xl">
          Join Pulse
        </h1>
        <p className="mt-4 text-base text-neutral-400 sm:text-lg">
          Drop your email. We&apos;ll let you know when we open the doors.
        </p>
        <div className="mt-10 w-full">
          <SignupForm />
        </div>
      </section>
    </main>
  );
}
