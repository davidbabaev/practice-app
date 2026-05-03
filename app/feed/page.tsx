import type { Metadata } from "next";
import Link from "next/link";
import { getFeed } from "@/app/lib/feed";
import { RefreshButton } from "./RefreshButton";

export const metadata: Metadata = {
  title: "Feed · Pulse",
  description: "What's happening on Pulse right now.",
};

const postedAtFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

const generatedAtFormat = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

export default async function FeedPage() {
  const { posts, generatedAt } = await getFeed();

  return (
    <main className="flex flex-1 justify-center bg-neutral-950 px-6 py-16 font-sans text-neutral-50">
      <section className="flex w-full max-w-2xl flex-col">
        <Link
          href="/"
          className="self-start text-sm text-neutral-400 transition-colors hover:text-neutral-200"
        >
          ← Pulse
        </Link>
        <header className="mt-8 flex items-center justify-between">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Feed
          </h1>
          <RefreshButton />
        </header>
        <ul className="mt-10 flex flex-col gap-6">
          {posts.map((post) => (
            <li
              key={post.id}
              className="border-b border-neutral-800 pb-6 last:border-b-0"
            >
              <div className="flex items-baseline gap-2">
                <Link
                  href={`/p/${post.handle}`}
                  className="text-sm font-medium text-neutral-200 hover:text-neutral-50"
                >
                  @{post.handle}
                </Link>
                <span className="text-xs text-neutral-500">
                  {postedAtFormat.format(new Date(post.postedAt))}
                </span>
              </div>
              <p className="mt-2 text-base text-neutral-100">{post.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-12 text-xs text-neutral-500">
          Cache filled at {generatedAtFormat.format(new Date(generatedAt))} UTC
        </p>
      </section>
    </main>
  );
}
