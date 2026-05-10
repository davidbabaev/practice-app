import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getAllSlugs, getCar } from "@/app/lib/cars";

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
    return { title: "Car not found · Onyx" };
  }
  return {
    title: `${car.brand} ${car.name} · Onyx`,
    description: car.shortDescription,
  };
}

export default async function CarDetailPage({ params }: Props) {
  const { slug } = await params;
  const car = getCar(slug);
  if (!car) {
    notFound();
  }

  return (
    <main className="flex-1 bg-neutral-950 text-neutral-50">
      <div className="mx-auto max-w-5xl px-6 py-10 sm:px-10 sm:py-14">
        <Link
          href="/cars"
          className="text-sm text-neutral-400 transition-colors hover:text-neutral-50"
        >
          ← The Fleet
        </Link>

        <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900">
          <div
            aria-hidden
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${car.photoUrl})` }}
          />
        </div>

        <header className="mt-10 sm:mt-12">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            {car.brand}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-3">
            <h1 className="font-serif text-5xl font-medium tracking-tight sm:text-6xl">
              {car.name}
            </h1>
            <span className="rounded-full border border-neutral-700 bg-neutral-900 px-3 py-1 text-xs uppercase tracking-[0.15em] text-neutral-300">
              {car.category}
            </span>
          </div>
          <p className="mt-6 font-serif text-3xl text-neutral-50 sm:text-4xl">
            ${car.dailyPrice.toLocaleString()}
            <span className="text-base text-neutral-500"> / day</span>
          </p>
        </header>

        <dl className="mt-10 grid grid-cols-3 gap-6 border-y border-neutral-800 py-6">
          <div>
            <dt className="text-xs uppercase tracking-wider text-neutral-500">
              Seats
            </dt>
            <dd className="mt-1 text-neutral-50">{car.seats}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-neutral-500">
              Transmission
            </dt>
            <dd className="mt-1 capitalize text-neutral-50">
              {car.transmission}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-neutral-500">
              Location
            </dt>
            <dd className="mt-1 text-neutral-50">{car.location}</dd>
          </div>
        </dl>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-300">
          {car.shortDescription}
        </p>

        <div className="mt-12">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link href={`/booking/${car.slug}`}>Reserve this car</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
