"use server";

import { updateTag } from "next/cache";

export async function refreshFeed() {
  updateTag("feed");
}
