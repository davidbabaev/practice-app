import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center bg-neutral-950 px-6 py-16 font-sans text-neutral-50">
      <section className="flex max-w-2xl flex-col items-center text-center">
        <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">
          Pulse
        </h1>
        <p className="mt-4 text-base text-neutral-400 sm:mt-6 sm:text-lg">
          The social network that doesn&apos;t sell your attention.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
          <Link
            href="/join"
            className="rounded-full bg-neutral-50 px-6 py-3 text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-50"
          >
            Get started
          </Link>
          <button
            type="button"
            className="rounded-full border border-neutral-700 px-6 py-3 text-sm font-medium text-neutral-50 transition-colors hover:border-neutral-500 hover:bg-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-50"
          >
            Learn more
          </button>
        </div>
        <div className="mt-12 flex flex-col items-center gap-3 sm:mt-16">
          <p className="text-xs uppercase tracking-wider text-neutral-500">
            Featured
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link
              href="/p/ada"
              className="rounded-full border border-neutral-800 px-3 py-1 text-sm text-neutral-300 transition-colors hover:border-neutral-600 hover:text-neutral-50"
            >
              @ada
            </Link>
            <Link
              href="/p/linus"
              className="rounded-full border border-neutral-800 px-3 py-1 text-sm text-neutral-300 transition-colors hover:border-neutral-600 hover:text-neutral-50"
            >
              @linus
            </Link>
            <Link
              href="/p/grace"
              className="rounded-full border border-neutral-800 px-3 py-1 text-sm text-neutral-300 transition-colors hover:border-neutral-600 hover:text-neutral-50"
            >
              @grace
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
