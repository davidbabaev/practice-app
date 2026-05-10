import Link from "next/link";

import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10">
        <Link
          href="/"
          className="font-serif text-2xl font-medium tracking-tight text-neutral-50 transition-colors hover:text-neutral-200"
        >
          Onyx
        </Link>
        <nav className="flex items-center gap-3 sm:gap-5">
          <Link
            href="/cars"
            className="hidden text-xs uppercase tracking-[0.2em] text-neutral-400 transition-colors hover:text-neutral-50 md:inline-flex"
          >
            Fleet
          </Link>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="rounded-full border-neutral-700 bg-transparent text-neutral-50 hover:bg-neutral-50/10 hover:text-neutral-50 dark:bg-transparent dark:hover:bg-neutral-50/10"
          >
            <Link href="/sign-in">Sign in</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
