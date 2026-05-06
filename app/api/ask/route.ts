import { anthropic } from "@ai-sdk/anthropic";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

export const maxDuration = 30;

const MAX_MESSAGES = 32;
const MAX_TEXT_PER_PART = 4000;

const SYSTEM_PROMPT = `You are Pulse, the helpful assistant for the Pulse social network.
Pulse is the social network that doesn't sell its users' attention.
Be concise, warm, and direct. Answer in plain text without markdown formatting.`;

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
