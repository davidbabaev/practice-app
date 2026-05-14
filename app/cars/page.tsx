import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";

import { filterCars } from "@/app/lib/cars";
import { getAllCars } from "@/app/lib/cars-data";
import { CarFilters } from "./CarFilters";

type Props = {
  searchParams: Promise<{
    category?: string;
    brand?: string;
    search?: string;
    sort?: string;
  }>;
};

export const metadata: Metadata = {
  title: "The Fleet · Onyx",
  description: "Curated luxury cars for rent in Miami.",
};

export default function CarsPage({ searchParams }: Props) {
  return (
    <main className="flex-1 bg-neutral-950 text-neutral-50">
      <div className="mx-auto max-w-7xl px-6 pt-28 pb-10 sm:px-10 sm:pt-32 sm:pb-14">
        <header>
          <h1 className="font-serif text-5xl font-medium tracking-tight sm:text-6xl">
            The Fleet
          </h1>
          <p className="mt-3 text-lg text-neutral-400">
            Curated luxury, delivered in Miami.
          </p>
        </header>

        <div className="mt-10">
          <Suspense fallback={<CarFiltersSkeleton />}>
            <CarFilters />
          </Suspense>
        </div>

        <Suspense fallback={<CarsGridSkeleton />}>
          <CarsGrid searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}

async function CarsGrid({ searchParams }: { searchParams: Props["searchParams"] }) {
  const params = await searchParams;
  const cars = filterCars(await getAllCars(), params);

  if (cars.length === 0) {
    return (
      <div className="mt-16 flex flex-col items-center text-center">
        <p className="font-serif text-2xl text-neutral-200">
          No cars match those filters.
        </p>
        <p className="mt-2 text-sm text-neutral-500">
          Try widening the search, or clear the filters.
        </p>
        <Link
          href="/cars"
          className="mt-6 text-sm text-champagne transition-colors hover:text-neutral-50"
        >
          Clear all filters →
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cars.map((car) => (
        <Link
          key={car.id}
          href={`/cars/${car.slug}`}
          className="group block overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 transition-colors hover:border-neutral-600"
        >
          <div className="relative aspect-video overflow-hidden bg-neutral-800">
            <div
              aria-hidden
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${car.photoUrl})` }}
            />
            <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs uppercase tracking-[0.15em] text-neutral-50 backdrop-blur-sm">
              {car.category}
            </span>
          </div>
          <div className="p-5">
            <p className="text-xs uppercase tracking-wider text-neutral-500">
              {car.brand}
            </p>
            <h3 className="mt-1 font-serif text-xl text-neutral-50">
              {car.name}
            </h3>
            <div className="mt-4 flex items-end justify-between">
              <p>
                <span className="text-lg font-medium text-neutral-50">
                  ${car.dailyPrice.toLocaleString()}
                </span>
                <span className="text-sm text-neutral-500"> / day</span>
              </p>
              <span className="text-sm text-neutral-400 transition-colors group-hover:text-neutral-50">
                View details →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function CarFiltersSkeleton() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="h-9 w-16 animate-pulse rounded-full bg-neutral-900" />
      <div className="h-9 w-20 animate-pulse rounded-full bg-neutral-900" />
      <div className="h-9 w-24 animate-pulse rounded-full bg-neutral-900" />
      <div className="h-9 w-28 animate-pulse rounded-full bg-neutral-900" />
      <div className="h-9 w-32 animate-pulse rounded-full bg-neutral-900" />
      <div className="h-9 w-44 animate-pulse rounded-full bg-neutral-900" />
      <div className="h-9 w-36 animate-pulse rounded-full bg-neutral-900" />
    </div>
  );
}

function CarsGridSkeleton() {
  return (
    <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900"
        >
          <div className="aspect-video animate-pulse bg-neutral-800" />
          <div className="p-5">
            <div className="h-3 w-16 animate-pulse rounded bg-neutral-800" />
            <div className="mt-2 h-5 w-32 animate-pulse rounded bg-neutral-800" />
            <div className="mt-4 h-5 w-20 animate-pulse rounded bg-neutral-800" />
          </div>
        </div>
      ))}
    </div>
  );
}
