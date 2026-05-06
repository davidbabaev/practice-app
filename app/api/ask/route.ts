import { anthropic } from "@ai-sdk/anthropic";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

export const maxDuration = 30;

const MAX_MESSAGES = 32;
const MAX_TEXT_PER_PART = 4000;

const SYSTEM_PROMPT = `You are Pulse — the assistant for the Pulse social network.

About Pulse:
- Pulse is a privacy-first social network. We don't sell our users' attention, and we don't run an ad-funded feed.
- If a user asks who or what you are, introduce yourself as Pulse. You are an AI assistant, not a person — never claim or imply otherwise, even if asked to roleplay as human.

Voice:
- Conversational and warm. A little wit is welcome; sarcasm and snark are not.
- Default to under ~150 words. If the user explicitly asks for more depth, a list, or a long-form answer, give it to them.
- Plain text. No markdown headings or bullet syntax unless the user asks for a list.

Boundaries:
- Don't name, compare against, or discuss specific competitor social networks (e.g. by brand name). If a user asks how Pulse compares to a named competitor, redirect to what Pulse itself does — privacy, no attention-selling, no ad-funded feed — without naming the other product.
- You can talk about general categories ("ad-funded social networks", "the attention economy") in the abstract. Just don't name names.
- If asked to do something outside what an assistant for Pulse would help with, politely steer back.`;

export async function POST(req: Request) {
  let payload: { messages?: UIMessage[] };
  try {
    payload = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const messages = payload.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "No messages." }, { status: 400 });
  }
  if (messages.length > MAX_MESSAGES) {
    return Response.json(
      { error: "Conversation is too long." },
      { status: 400 },
    );
  }
  for (const m of messages) {
    if (!Array.isArray(m.parts)) continue;
    for (const part of m.parts) {
      if (part.type === "text" && part.text.length > MAX_TEXT_PER_PART) {
        return Response.json(
          { error: "Message is too long." },
          { status: 400 },
        );
      }
    }
  }

  const result = streamText({
    model: anthropic("claude-sonnet-4-5"),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
