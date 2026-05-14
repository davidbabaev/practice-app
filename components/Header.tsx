"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 80;

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-neutral-800 bg-neutral-950/80 backdrop-blur-sm"
          : "border-transparent bg-transparent",
      )}
    >
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
