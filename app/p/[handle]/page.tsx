import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProfile } from "@/app/lib/profiles";

type Props = {
  params: Promise<{ handle: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const profile = getProfile(handle);
  if (!profile) {
    return { title: "Profile not found · Pulse" };
  }
  return {
    title: `@${profile.handle} · Pulse`,
    description: profile.bio,
  };
}

export default async function ProfilePage({ params }: Props) {
  const { handle } = await params;
  const profile = getProfile(handle);
  if (!profile) {
    notFound();
  }

  return (
    <main className="flex flex-1 items-center justify-center bg-neutral-950 px-6 py-16 font-sans text-neutral-50">
      <article className="flex w-full max-w-xl flex-col">
        <Link
          href="/"
          className="text-sm text-neutral-400 transition-colors hover:text-neutral-200"
        >
          ← Pulse
        </Link>
        <h1 className="mt-8 text-4xl font-semibold tracking-tight sm:text-5xl">
          {profile.name}
        </h1>
        <p className="mt-2 text-base text-neutral-400">@{profile.handle}</p>
        <p className="mt-6 text-lg text-neutral-200">{profile.bio}</p>
        <p className="mt-8 text-sm text-neutral-500">
          Joined {profile.joinedAt.slice(0, 4)}
        </p>
      </article>
    </main>
  );
}
