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

const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;

const cars: Car[] = [
  {
    id: "1",
    slug: "lamborghini-huracan",
    name: "Huracán EVO",
    brand: "Lamborghini",
    category: "exotic",
    dailyPrice: 1499,
    photoUrl: photo("1682825132000-4670b89ee97b"),
    location: "Miami",
    seats: 2,
    transmission: "automatic",
    shortDescription:
      "631-hp V10 with razor-edged styling — pure exotic theatre on every drive.",
  },
  {
    id: "2",
    slug: "ferrari-488",
    name: "488 GTB",
    brand: "Ferrari",
    category: "exotic",
    dailyPrice: 1599,
    photoUrl: photo("1645539706006-83c3b9bcd0d4"),
    location: "Miami",
    seats: 2,
    transmission: "automatic",
    shortDescription:
      "Mid-engine V8 turbo — Ferrari's most accessible supercar, still ferocious.",
  },
  {
    id: "3",
    slug: "mclaren-720s",
    name: "720S",
    brand: "McLaren",
    category: "exotic",
    dailyPrice: 1899,
    photoUrl: photo("1748091677370-a4f14bd24943"),
    location: "Miami",
    seats: 2,
    transmission: "automatic",
    shortDescription:
      "Carbon-tub chassis and 710 hp — a hypercar in everything but name.",
  },
  {
    id: "4",
    slug: "mercedes-s-class",
    name: "S 580",
    brand: "Mercedes-Benz",
    category: "executive",
    dailyPrice: 499,
    photoUrl: photo("1577546311477-67ef792021b7"),
    location: "Miami",
    seats: 5,
    transmission: "automatic",
    shortDescription:
      "The benchmark for chauffeur-grade comfort and quiet authority.",
  },
  {
    id: "5",
    slug: "bmw-7-series",
    name: "760i xDrive",
    brand: "BMW",
    category: "executive",
    dailyPrice: 479,
    photoUrl: photo("1560253787-9c3babc1fab2"),
    location: "Miami",
    seats: 5,
    transmission: "automatic",
    shortDescription:
      "Twin-turbo V8 wrapped in the most expressive 7-Series ever built.",
  },
  {
    id: "6",
    slug: "audi-rs7",
    name: "RS 7 Sportback",
    brand: "Audi",
    category: "executive",
    dailyPrice: 599,
    photoUrl: photo("1655284345297-32ac916ce235"),
    location: "Miami",
    seats: 5,
    transmission: "automatic",
    shortDescription:
      "591-hp four-door grand tourer — executive presence with supercar pace.",
  },
  {
    id: "7",
    slug: "porsche-911-cabriolet",
    name: "911 Carrera S Cabriolet",
    brand: "Porsche",
    category: "convertible",
    dailyPrice: 899,
    photoUrl: photo("1766819755230-c98b557e33fe"),
    location: "Miami",
    seats: 4,
    transmission: "automatic",
    shortDescription:
      "The definitive open-top sports car — A1A traffic becomes the destination.",
  },
  {
    id: "8",
    slug: "mercedes-sl63",
    name: "SL 63 AMG",
    brand: "Mercedes-AMG",
    category: "convertible",
    dailyPrice: 749,
    photoUrl: photo("1759115242663-32ae203f0781"),
    location: "Miami",
    seats: 2,
    transmission: "automatic",
    shortDescription:
      "Hand-built 4.0L V8 biturbo and a soft-top that drops in 15 seconds.",
  },
];

export function getAllCars(): Car[] {
  return cars;
}

export function getAllSlugs(): string[] {
  return cars.map((c) => c.slug);
}

export function getCar(slug: string): Car | undefined {
  return cars.find((c) => c.slug === slug);
}
