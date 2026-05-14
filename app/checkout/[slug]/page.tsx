import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import { getCar } from "@/app/lib/cars-data";

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const car = await getCar(slug);
  if (!car) {
    return { title: "Checkout · Onyx" };
  }
  return {
    title: `Checkout: ${car.brand} ${car.name} · Onyx`,
    description: `Confirm your reservation for the ${car.brand} ${car.name}.`,
  };
}

export default function CheckoutPage({ params, searchParams }: Props) {
  return (
    <main className="flex-1 bg-neutral-950 text-neutral-50">
      <div className="mx-auto max-w-3xl px-6 pt-28 pb-10 sm:px-10 sm:pt-32 sm:pb-14">
        <Suspense fallback={<CheckoutSkeleton />}>
          <CheckoutContent params={params} searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}

async function CheckoutContent({ params, searchParams }: Props) {
  const { slug } = await params;
  const { start, end } = await searchParams;
  const car = await getCar(slug);

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

  const subtotal = car.dailyPrice * days;
  const total = subtotal;

  return (
    <>
      <Link
        href={`/booking/${car.slug}?start=${start}&end=${end}`}
        className="text-sm text-neutral-400 transition-colors hover:text-neutral-50"
      >
        ← Booking
      </Link>

      <header className="mt-8">
        <h1 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
          Review your booking
        </h1>
        <p className="mt-3 text-neutral-400">
          Confirm the details before payment.
        </p>
      </header>

      <section className="mt-10 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div
            aria-hidden
            className="aspect-video w-full overflow-hidden rounded-xl border border-neutral-800 bg-cover bg-center sm:w-48"
            style={{ backgroundImage: `url(${car.photoUrl})` }}
          />
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              {car.brand}
            </p>
            <h2 className="mt-2 font-serif text-2xl text-neutral-50">
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

        <div className="mt-6 border-t border-neutral-800 pt-6">
          <div className="flex items-baseline justify-between text-sm text-neutral-400">
            <span>
              ${car.dailyPrice.toLocaleString()} × {days}{" "}
              {days === 1 ? "day" : "days"}
            </span>
            <span>${subtotal.toLocaleString()}</span>
          </div>
          <div className="mt-4 flex items-baseline justify-between border-t border-neutral-800 pt-4">
            <span className="text-xs uppercase tracking-wider text-neutral-500">
              Total
            </span>
            <span className="font-serif text-4xl text-neutral-50">
              ${total.toLocaleString()}
            </span>
          </div>
        </div>
      </section>

      <p className="mt-8 text-sm text-neutral-500">
        Payment processing coming soon.
      </p>

      <div className="mt-4">
        <Button asChild size="lg" className="rounded-full px-8">
          <Link href={`/confirmation/${car.slug}?start=${start}&end=${end}`}>
            Confirm and pay
          </Link>
        </Button>
      </div>
    </>
  );
}

function CheckoutSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 w-24 rounded bg-neutral-800" />
      <div className="mt-8 h-12 w-3/4 rounded bg-neutral-800" />
      <div className="mt-3 h-5 w-1/2 rounded bg-neutral-800" />
      <div className="mt-10 h-72 rounded-2xl bg-neutral-900/50" />
      <div className="mt-8 h-5 w-48 rounded bg-neutral-800" />
      <div className="mt-4 h-12 w-44 rounded-full bg-neutral-800" />
    </div>
  );
}
