import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import { getCar } from "@/app/lib/cars";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ start?: string; end?: string }>;
};

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function diffDays(start: string, end: string): number {
  const ms =
    new Date(`${end}T00:00:00`).getTime() -
    new Date(`${start}T00:00:00`).getTime();
  return Math.round(ms / 86_400_000);
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function confirmationCode(seed: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0)
    .toString(36)
    .toUpperCase()
    .padStart(6, "0")
    .slice(0, 6);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const car = getCar(slug);
  if (!car) {
    return { title: "Booked · Onyx" };
  }
  return {
    title: `Booked: ${car.brand} ${car.name} · Onyx`,
    description: `Your reservation for the ${car.brand} ${car.name} is confirmed.`,
  };
}

export default function ConfirmationPage({ params, searchParams }: Props) {
  return (
    <main className="flex-1 bg-neutral-950 text-neutral-50">
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-16 text-center sm:px-10 sm:py-24">
        <Suspense fallback={<ConfirmationSkeleton />}>
          <ConfirmationContent params={params} searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}

async function ConfirmationContent({ params, searchParams }: Props) {
  const { slug } = await params;
  const { start, end } = await searchParams;
  const car = getCar(slug);

  if (
    !car ||
    !start ||
    !end ||
    !ISO_DATE.test(start) ||
    !ISO_DATE.test(end)
  ) {
    notFound();
  }

  const days = diffDays(start, end);
  if (!Number.isFinite(days) || days <= 0) {
    notFound();
  }

  const total = car.dailyPrice * days;
  const code = `ON-${confirmationCode(`${car.slug}|${start}|${end}`)}`;

  return (
    <>
      <h1 className="font-serif text-5xl font-medium tracking-tight sm:text-6xl">
        You&apos;re booked
      </h1>
      <p className="mt-4 max-w-md text-lg text-neutral-300">
        {car.name} is yours from {formatDate(start)} to {formatDate(end)}.
      </p>

      <p className="mt-8 rounded-full border border-neutral-700 bg-neutral-900 px-4 py-2 font-mono text-sm tracking-[0.2em] text-neutral-200">
        {code}
      </p>

      <section className="mt-10 w-full rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 text-left sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div
            aria-hidden
            className="aspect-video w-full overflow-hidden rounded-xl border border-neutral-800 bg-cover bg-center sm:w-40"
            style={{ backgroundImage: `url(${car.photoUrl})` }}
          />
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              {car.brand}
            </p>
            <h2 className="mt-2 font-serif text-xl text-neutral-50">
              {car.name}
            </h2>
            <p className="mt-2 text-sm">
              <span className="text-neutral-50">
                ${car.dailyPrice.toLocaleString()}
              </span>
              <span className="text-neutral-500"> / day</span>
            </p>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-neutral-800 pt-6">
          <div>
            <dt className="text-xs uppercase tracking-wider text-neutral-500">
              Pickup
            </dt>
            <dd className="mt-1 text-neutral-50">{formatDate(start)}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-neutral-500">
              Return
            </dt>
            <dd className="mt-1 text-neutral-50">{formatDate(end)}</dd>
          </div>
        </dl>

        <div className="mt-6 flex items-baseline justify-between border-t border-neutral-800 pt-6">
          <span className="text-xs uppercase tracking-wider text-neutral-500">
            Total
          </span>
          <span className="font-serif text-3xl text-neutral-50">
            ${total.toLocaleString()}
          </span>
        </div>
      </section>

      <p className="mt-8 text-sm text-neutral-500">
        A confirmation email is on its way.
      </p>

      <div className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
        <Button asChild size="lg" className="rounded-full px-8">
          <Link href="/cars">Browse the fleet</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="rounded-full border-neutral-50/30 bg-transparent px-8 text-neutral-50 hover:bg-neutral-50/10 hover:text-neutral-50 dark:bg-transparent dark:hover:bg-neutral-50/10"
        >
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </>
  );
}

function ConfirmationSkeleton() {
  return (
    <div className="flex w-full animate-pulse flex-col items-center">
      <div className="h-12 w-72 rounded bg-neutral-800" />
      <div className="mt-4 h-5 w-80 rounded bg-neutral-800" />
      <div className="mt-8 h-8 w-32 rounded-full bg-neutral-800" />
      <div className="mt-10 h-64 w-full rounded-2xl bg-neutral-900/50" />
      <div className="mt-8 h-4 w-56 rounded bg-neutral-800" />
      <div className="mt-10 h-12 w-72 rounded-full bg-neutral-800" />
    </div>
  );
}
