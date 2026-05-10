const HERO_BG_URL = "/heroImage.png";

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
    </main>
  );
}
