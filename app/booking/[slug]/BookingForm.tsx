"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function todayISO(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function diffDays(start: string, end: string): number {
  if (!start || !end) return 0;
  const ms =
    new Date(`${end}T00:00:00`).getTime() -
    new Date(`${start}T00:00:00`).getTime();
  return Math.round(ms / 86_400_000);
}

type Props = {
  slug: string;
  dailyPrice: number;
};

export function BookingForm({ slug, dailyPrice }: Props) {
  const [today, setToday] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    setToday(todayISO());
  }, []);

  const days = diffDays(start, end);
  const valid = Boolean(start) && Boolean(end) && start >= today && days > 0;
  const total = valid ? days * dailyPrice : 0;

  return (
    <section className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 sm:p-8">
      <h2 className="font-serif text-3xl text-neutral-50">Your trip</h2>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs uppercase tracking-wider text-neutral-500">
            Start date
          </span>
          <Input
            type="date"
            value={start}
            min={today}
            onChange={(e) => setStart(e.target.value)}
            className="mt-2"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wider text-neutral-500">
            End date
          </span>
          <Input
            type="date"
            value={end}
            min={start || today}
            onChange={(e) => setEnd(e.target.value)}
            className="mt-2"
          />
        </label>
      </div>

      <div className="mt-8 border-t border-neutral-800 pt-6">
        <p className="text-xs uppercase tracking-wider text-neutral-500">
          Total
        </p>
        <p className="mt-2 font-serif text-5xl text-neutral-50">
          ${total.toLocaleString()}
        </p>
        {days > 0 ? (
          <p className="mt-2 text-sm text-neutral-400">
            ${dailyPrice.toLocaleString()} / day × {days}{" "}
            {days === 1 ? "day" : "days"}
          </p>
        ) : (
          <p className="mt-2 text-sm text-neutral-500">
            Select start and end dates
          </p>
        )}
      </div>

      <div className="mt-8">
        {valid ? (
          <Button
            asChild
            size="lg"
            className="w-full rounded-full px-8 sm:w-auto"
          >
            <Link href={`/checkout/${slug}?start=${start}&end=${end}`}>
              Continue to checkout
            </Link>
          </Button>
        ) : (
          <Button
            size="lg"
            className="w-full rounded-full px-8 sm:w-auto"
            disabled
          >
            Continue to checkout
          </Button>
        )}
      </div>
    </section>
  );
}
