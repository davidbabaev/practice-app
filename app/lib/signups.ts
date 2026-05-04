// ⚠️ PRODUCTION HAZARD — DEMO ONLY
//
// This module stores signups in a process-local `Set`. That means:
//   • Data is lost on every cold start, redeploy, or process restart.
//   • In serverless (Vercel, Lambda, Cloud Run) each instance has its own
//     Set, so "already on the list" responses are non-deterministic and
//     most signups will never be seen by any other instance.
//   • There is no persistence, no backup, no cross-region replication.
//
// Replace with a real datastore (Postgres, Redis, Vercel KV, Upstash, etc.)
// before deploying anywhere beyond a local demo. Until then, do not rely
// on `getSignups()` returning a complete or stable list.

const signups = new Set<string>();

export function addSignup(email: string): { added: boolean } {
  if (signups.has(email)) {
    return { added: false };
  }
  signups.add(email);
  return { added: true };
}

export function getSignups(): string[] {
  return Array.from(signups);
}
