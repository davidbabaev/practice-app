export default function FeedLoading() {
  return (
    <main className="flex flex-1 justify-center bg-neutral-950 px-6 py-16 font-sans text-neutral-50">
      <section className="flex w-full max-w-2xl flex-col">
        <span className="self-start text-sm text-neutral-400">← Pulse</span>
        <header className="mt-8 flex items-center justify-between">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Feed
          </h1>
          <div
            aria-hidden
            className="h-8 w-24 animate-pulse rounded-full bg-neutral-800"
          />
        </header>
        <ul className="mt-10 flex flex-col gap-6" aria-label="Loading posts">
          {[0, 1, 2].map((i) => (
            <li
              key={i}
              className="border-b border-neutral-800 pb-6 last:border-b-0"
            >
              <div className="flex items-baseline gap-2">
                <div
                  aria-hidden
                  className="h-4 w-16 animate-pulse rounded bg-neutral-800"
                />
                <div
                  aria-hidden
                  className="h-3 w-24 animate-pulse rounded bg-neutral-900"
                />
              </div>
              <div className="mt-3 flex flex-col gap-2">
                <div
                  aria-hidden
                  className="h-4 w-full animate-pulse rounded bg-neutral-800"
                />
                <div
                  aria-hidden
                  className="h-4 w-4/5 animate-pulse rounded bg-neutral-800"
                />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
