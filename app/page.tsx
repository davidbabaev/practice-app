import Link from "next/link";

import { getAllCars, getCar } from "@/app/lib/cars-data";
import { Button } from "@/components/ui/button";

const HERO_BG_URL = "/heroImage.png";
const HERO_BG_MOBILE_URL = "/heroImgMobile.png";

const CURATOR_PICKS = [
  "mclaren-720s",
  "ferrari-488",
  "mercedes-s-class",
  "bmw-7-series",
] as const;

const HOW_IT_WORKS = [
  {
    numeral: "01",
    title: "Choose your car",
    description:
      "Browse the fleet, pick the one that matches your weekend.",
  },
  {
    numeral: "02",
    title: "Pick your dates",
    description:
      "Pickup and return any time. We work around your itinerary.",
  },
  {
    numeral: "03",
    title: "We deliver to your hotel",
    description:
      "Free Miami delivery. The car meets you wherever you're staying.",
  },
] as const;

const FLEET_CATEGORIES = [
  {
    slug: "lamborghini-huracan",
    category: "exotic",
    label: "Exotic",
    tagline:
      "Mid-engine theater. Carbon-fiber bones. The cars you came to drive.",
    browseLabel: "exotics",
  },
  {
    slug: "audi-rs7",
    category: "executive",
    label: "Executive",
    tagline:
      "Quiet authority. Hand-stitched everything. Arrive like you matter.",
    browseLabel: "executive",
  },
  {
    slug: "mercedes-sl63",
    category: "convertible",
    label: "Convertible",
    tagline:
      "Top down on A1A. Built for warm nights and long coastlines.",
    browseLabel: "convertibles",
  },
] as const;

export default async function Home() {
  const featured = await getCar("porsche-911-cabriolet");
  const cars = await getAllCars();
  const fleetCards = FLEET_CATEGORIES.map((cat) => {
    const car = cars.find((c) => c.slug === cat.slug);
    return car ? { ...cat, car } : null;
  }).filter((c): c is NonNullable<typeof c> => c !== null);
  const curatorPicks = (
    await Promise.all(CURATOR_PICKS.map((slug) => getCar(slug)))
  ).filter((c): c is NonNullable<typeof c> => c !== undefined);

  return (
    <main className="relative flex flex-1 flex-col bg-neutral-950 text-neutral-50">
      <section className="relative min-h-screen overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center sm:hidden"
          style={{ backgroundImage: `url(${HERO_BG_MOBILE_URL})` }}
        />
        <div
          aria-hidden
          className="absolute inset-0 hidden bg-cover bg-center sm:block"
          style={{ backgroundImage: `url(${HERO_BG_URL})` }}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-neutral-950/30 via-transparent to-neutral-950"
        />
      </section>

      <section className="relative bg-neutral-950 pb-24 sm:pb-32">
        {featured ? (
          <div className="mx-auto -mt-24 max-w-3xl px-6 sm:-mt-32">
            <p className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-champagne/70">
              Featured this week
            </p>
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl shadow-black/50">
              <div className="flex flex-col items-center gap-6 p-6 sm:flex-row sm:p-8">
                <div
                  aria-hidden
                  className="aspect-square w-32 overflow-hidden rounded-xl bg-cover bg-center sm:w-40"
                  style={{ backgroundImage: `url(${featured.photoUrl})` }}
                />
                <div className="hidden h-20 w-px self-center bg-champagne sm:block" />
                <div className="flex flex-1 flex-col gap-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                    {featured.brand}
                  </p>
                  <h3 className="font-serif text-2xl text-neutral-50 sm:text-3xl">
                    {featured.name}
                  </h3>
                  <p className="line-clamp-2 text-sm text-neutral-400">
                    {featured.shortDescription}
                  </p>
                  <p>
                    <span className="text-neutral-50">
                      ${featured.dailyPrice.toLocaleString()}
                    </span>
                    <span className="text-neutral-500"> / day</span>
                  </p>
                  <Link
                    href={`/cars/${featured.slug}`}
                    className="text-sm text-neutral-200 underline-offset-4 transition-colors hover:text-champagne hover:underline"
                  >
                    View this car →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40">
          <header className="mb-12 sm:mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-champagne/70">
              Explore
            </p>
            <h2 className="mt-3 font-serif text-5xl text-neutral-50 sm:text-6xl">
              The Fleet
            </h2>
            <p className="mt-4 max-w-xl text-lg text-neutral-400">
              Three categories. Eight cars. All curated for Miami&apos;s open
              roads and warm nights.
            </p>
          </header>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {fleetCards.map(({ car, category, label, tagline, browseLabel }) => (
              <Link
                key={car.slug}
                href={`/cars?category=${category}`}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${car.photoUrl})` }}
                  />
                </div>
                <div className="mt-6">
                  <h3 className="font-serif text-3xl text-neutral-50">
                    {label}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-400">{tagline}</p>
                  <p className="mt-5 text-sm text-neutral-300 transition-colors group-hover:text-neutral-50">
                    Browse {browseLabel} →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-24 max-w-7xl px-6 sm:mt-32">
          <header className="mb-12 sm:mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-champagne/70">
              This weekend
            </p>
            <h2 className="mt-3 font-serif text-5xl text-neutral-50 sm:text-6xl">
              Curator&apos;s Picks
            </h2>
            <p className="mt-4 max-w-xl text-lg text-neutral-400">
              Four cars our curator put at the top of the list this week.
            </p>
          </header>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {curatorPicks.map((car) => (
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
                    <span className="text-sm text-neutral-400 transition-colors group-hover:text-champagne">
                      Reserve →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-24 max-w-7xl px-6 sm:mt-32">
          <header className="mb-12 max-w-2xl sm:mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-champagne/70">
              The process
            </p>
            <h2 className="mt-3 font-serif text-5xl text-neutral-50 sm:text-6xl">
              How Onyx Works
            </h2>
            <p className="mt-4 text-lg text-neutral-400">
              Curated cars, quietly delivered. Three steps, no surprises.
            </p>
          </header>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 lg:gap-12">
            {HOW_IT_WORKS.map(({ numeral, title, description }) => (
              <div key={numeral}>
                <p className="font-serif text-7xl leading-none text-neutral-700">
                  {numeral}
                </p>
                <h3 className="mt-6 font-serif text-2xl text-neutral-50">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-950 pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-serif text-5xl leading-none tracking-tight text-neutral-50 sm:text-7xl">
            Miami&apos;s waiting<span className="text-champagne">.</span>
          </h2>
          <p className="mt-6 text-lg text-neutral-400">
            Browse the fleet, pick your weekend.
          </p>
          <div className="mt-12">
            <Button asChild size="lg" className="rounded-full px-10">
              <Link href="/cars">Browse the fleet</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
