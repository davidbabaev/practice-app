export type Profile = {
  handle: string;
  name: string;
  bio: string;
  joinedAt: string;
};

const profiles: Profile[] = [
  {
    handle: "ada",
    name: "Ada Lovelace",
    bio: "Notes on engines, both analytical and otherwise.",
    joinedAt: "1843-10-01",
  },
  {
    handle: "linus",
    name: "Linus Torvalds",
    bio: "Talk is cheap. Show me the timeline.",
    joinedAt: "1991-08-25",
  },
  {
    handle: "grace",
    name: "Grace Hopper",
    bio: "It's easier to ask forgiveness than permission. Posting accordingly.",
    joinedAt: "1959-03-15",
  },
];

export function getProfile(handle: string): Profile | undefined {
  return profiles.find((p) => p.handle === handle);
}
