import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { supabase } from "@/lib/supabase/server";

import type { Car, CarCategory } from "./cars";

type CarRow = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  daily_price: number;
  photo_url: string;
  location: string;
  seats: number;
  transmission: string;
  short_description: string;
};

function toCar(row: CarRow): Car {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand: row.brand,
    category: row.category as CarCategory,
    dailyPrice: row.daily_price,
    photoUrl: row.photo_url,
    location: row.location as Car["location"],
    seats: row.seats,
    transmission: row.transmission as Car["transmission"],
    shortDescription: row.short_description,
  };
}

export async function getAllCars(): Promise<Car[]> {
  "use cache";
  cacheTag("cars");
  cacheLife("hours");

  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("getAllCars failed:", error.message);
    return [];
  }

  return (data as CarRow[]).map(toCar);
}

export async function getAllSlugs(): Promise<string[]> {
  "use cache";
  cacheTag("cars");
  cacheLife("hours");

  const { data, error } = await supabase.from("cars").select("slug");

  if (error) {
    console.error("getAllSlugs failed:", error.message);
    return [];
  }

  return data.map((row) => row.slug);
}

export async function getCar(slug: string): Promise<Car | undefined> {
  "use cache";
  cacheTag("cars");
  cacheLife("hours");

  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error(`getCar(${slug}) failed:`, error.message);
    return undefined;
  }

  return data ? toCar(data as CarRow) : undefined;
}
