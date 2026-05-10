import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getAllSlugs, getCar } from "@/app/lib/cars";
import { BookingForm } from "./BookingForm";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const car = getCar(slug);
  if (!car) {
    return { title: "Booking · Onyx" };
  }
  return {
    title: `Book ${car.brand} ${car.name} · Onyx`,
    description: `Reserve the ${car.brand} ${car.name} in Miami.`,
  };
}

export default async function BookingPage({ params }: Props) {
  const { slug } = await params;
  const car = getCar(slug);
  if (!car) {
    notFound();
  }

  return (
    <main className="flex-1 bg-neutral-950 text-neutral-50">
      <div className="mx-auto max-w-5xl px-6 py-10 sm:px-10 sm:py-14">
        <Link
          href={`/cars/${car.slug}`}
          className="text-sm text-neutral-400 transition-colors hover:text-neutral-50"
        >
          ← {car.name}
        </Link>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[2fr_3fr]">
          <aside className="lg:sticky lg:top-10 lg:self-start">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
              <div
                aria-hidden
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${car.photoUrl})` }}
              />
            </div>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-neutral-500">
              {car.brand}
            </p>
            <h2 className="mt-2 font-serif text-3xl text-neutral-50">
              {car.name}
            </h2>
            <p className="mt-3 text-lg">
              <span className="font-medium text-neutral-50">
                ${car.dailyPrice.toLocaleString()}
              </span>
              <span className="text-neutral-500"> / day</span>
            </p>
          </aside>

          <BookingForm slug={car.slug} dailyPrice={car.dailyPrice} />
        </div>
      </div>
    </main>
  );
}
