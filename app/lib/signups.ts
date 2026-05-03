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
