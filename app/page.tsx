import Link from "next/link";
import { Button } from "@/components/ui/button";

const HERO_BG_URL =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2400&q=80";

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col overflow-hidden bg-neutral-950 text-neutral-50">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_BG_URL})` }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90"
      />

      <header className="relative z-10 px-6 pt-6 sm:px-10 sm:pt-8">
        <span className="font-serif text-sm tracking-[0.3em] text-neutral-50">
          ONYX
        </span>
      </header>

      <section className="relative z-10 flex flex-1 items-center px-6 pb-24 sm:px-10">
        <div className="max-w-3xl">
          <h1 className="font-serif text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            Drive Miami in something unforgettable
          </h1>
          <p className="mt-6 max-w-xl text-lg text-neutral-300 sm:text-xl">
            Curated supercars, convertibles, and executive cars. Yours for the
            weekend.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/cars">Browse the fleet</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-neutral-50/30 bg-transparent px-8 text-neutral-50 backdrop-blur-sm hover:bg-neutral-50/10 hover:text-neutral-50 dark:bg-transparent dark:hover:bg-neutral-50/10"
            >
              <Link href="#">How it works</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
