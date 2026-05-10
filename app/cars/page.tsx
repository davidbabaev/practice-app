import Link from "next/link";
import { getAllCars } from "@/app/lib/cars";

export default function CarsPage() {
  const cars = getAllCars();

  return (
    <main className="flex-1 bg-neutral-950 text-neutral-50">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-10 sm:py-14">
        <header>
          <h1 className="font-serif text-5xl font-medium tracking-tight sm:text-6xl">
            The Fleet
          </h1>
          <p className="mt-3 text-lg text-neutral-400">
            Curated luxury, delivered in Miami.
          </p>
        </header>
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
      </div>
    </main>
  );
}
