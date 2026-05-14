export type CarCategory = "exotic" | "executive" | "convertible";

export type Car = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: CarCategory;
  dailyPrice: number;
  photoUrl: string;
  location: "Miami";
  seats: number;
  transmission: "automatic" | "manual";
  shortDescription: string;
};

export const CAR_CATEGORIES = ["exotic", "executive", "convertible"] as const;

// Note: 'mercedes' covers BOTH Mercedes-Benz and Mercedes-AMG — users don't separate them
export const CAR_BRAND_SLUGS = [
  "lamborghini",
  "ferrari",
  "mclaren",
  "mercedes",
  "bmw",
  "audi",
  "porsche",
] as const;

export function brandSlug(brand: string): string {
  const lower = brand.toLowerCase();
  if (lower.startsWith("mercedes")) return "mercedes";
  return lower;
}

export type CarFilterParams = {
  category?: string;
  brand?: string;
  search?: string;
  sort?: string;
};

export function filterCars(cars: Car[], params: CarFilterParams): Car[] {
  let result = cars;

  if (
    params.category &&
    (CAR_CATEGORIES as readonly string[]).includes(params.category)
  ) {
    result = result.filter((c) => c.category === params.category);
  }

  if (
    params.brand &&
    (CAR_BRAND_SLUGS as readonly string[]).includes(params.brand)
  ) {
    result = result.filter((c) => brandSlug(c.brand) === params.brand);
  }

  if (params.search && params.search.trim()) {
    const q = params.search.trim().toLowerCase();
    result = result.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.brand.toLowerCase().includes(q),
    );
  }

  if (params.sort === "price-asc") {
    result = [...result].sort((a, b) => a.dailyPrice - b.dailyPrice);
  } else if (params.sort === "price-desc") {
    result = [...result].sort((a, b) => b.dailyPrice - a.dailyPrice);
  }

  return result;
}
