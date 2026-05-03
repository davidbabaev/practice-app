import Link from "next/link";

export default function ProfileNotFound() {
  return (
    <main className="flex flex-1 items-center justify-center bg-neutral-950 px-6 py-16 font-sans text-neutral-50">
      <section className="flex max-w-md flex-col items-center text-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          No such profile
        </h1>
        <p className="mt-4 text-base text-neutral-400">
          That handle hasn&apos;t joined Pulse yet.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-full border border-neutral-700 px-6 py-3 text-sm font-medium text-neutral-50 transition-colors hover:border-neutral-500 hover:bg-neutral-900"
        >
          Back to Pulse
        </Link>
      </section>
    </main>
  );
}
