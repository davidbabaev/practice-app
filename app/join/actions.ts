"use server";

import { addSignup } from "@/app/lib/signups";

export type SignupState =
  | { status: "idle" }
  | { status: "success"; email: string }
  | { status: "error"; error: string };

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function signupAction(
  _prevState: SignupState,
  formData: FormData,
): Promise<SignupState> {
  const raw = formData.get("email");
  if (typeof raw !== "string" || raw.trim() === "") {
    return { status: "error", error: "Email is required." };
  }

  const email = raw.trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return { status: "error", error: "That doesn't look like an email." };
  }

  const { added } = addSignup(email);
  if (!added) {
    return { status: "error", error: "You're already on the list." };
  }

  return { status: "success", email };
}
