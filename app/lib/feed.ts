import { cacheLife, cacheTag } from "next/cache";

export type Post = {
  id: string;
  handle: string;
  body: string;
  postedAt: string;
};

export type Feed = {
  posts: Post[];
  generatedAt: string;
};

export async function getFeed(): Promise<Feed> {
  "use cache";
  cacheTag("feed");
  cacheLife("minutes");

  return {
    generatedAt: new Date().toISOString(),
    posts: [
      {
        id: "1",
        handle: "ada",
        body: "Spent the morning sketching a new note-taking notation. The notation matters more than people think.",
        postedAt: "2026-05-03T08:42:00Z",
      },
      {
        id: "2",
        handle: "linus",
        body: "Reviewed three patches today. Two were good. The third needed a longer commit message than its diff.",
        postedAt: "2026-05-03T07:15:00Z",
      },
      {
        id: "3",
        handle: "grace",
        body: 'Reminder: "a ship in port is safe, but that\'s not what ships are built for." Ship something this week.',
        postedAt: "2026-05-02T22:03:00Z",
      },
      {
        id: "4",
        handle: "ada",
        body: "Re-reading my own notes from a year ago. Past-me had ideas present-me forgot. Take notes.",
        postedAt: "2026-05-02T18:00:00Z",
      },
      {
        id: "5",
        handle: "linus",
        body: "Talk is cheap. Show me the timeline.",
        postedAt: "2026-05-02T09:30:00Z",
      },
    ],
  };
}
