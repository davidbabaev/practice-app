"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, type FormEvent, type KeyboardEvent } from "react";

const MAX_INPUT_LENGTH = 4000;

export function AskChat() {
  const {
    messages,
    sendMessage,
    setMessages,
    status,
    error,
    stop,
    clearError,
  } = useChat({
    transport: new DefaultChatTransport({ api: "/api/ask" }),
  });
  const [input, setInput] = useState("");

  const isStreaming = status === "submitted" || status === "streaming";

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isStreaming) return;
    sendMessage({ text });
    setInput("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  }

  function handleClear() {
    if (isStreaming) stop();
    setMessages([]);
    clearError();
  }

  return (
    <div className="flex flex-col gap-6">
      {messages.length === 0 ? (
        <p className="text-center text-sm text-neutral-400">
          Hi, I&apos;m Pulse. Ask me anything.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleClear}
              className="text-xs text-neutral-500 transition-colors hover:text-neutral-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-50"
            >
              Clear
            </button>
          </div>
          <ul
            aria-live="polite"
            aria-busy={isStreaming}
            className="flex flex-col gap-4"
          >
            {messages.map((m) => (
              <li
                key={m.id}
                className={
                  m.role === "user"
                    ? "self-end max-w-[85%] rounded-2xl bg-neutral-50 px-4 py-2 text-sm text-neutral-950"
                    : "self-start max-w-[85%] rounded-2xl border border-neutral-800 px-4 py-2 text-sm text-neutral-100 whitespace-pre-wrap"
                }
              >
                {m.parts.map((part, i) =>
                  part.type === "text" ? <span key={i}>{part.text}</span> : null,
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {error ? (
        <p aria-live="polite" className="text-xs text-red-400">
          Couldn&apos;t reach Pulse. Try again.
        </p>
      ) : null}

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label htmlFor="ask-input" className="sr-only">
          Ask Pulse
        </label>
        <textarea
          id="ask-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything…"
          rows={3}
          maxLength={MAX_INPUT_LENGTH}
          disabled={isStreaming}
          className="resize-none rounded-2xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-neutral-50 placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-50 disabled:opacity-60"
        />
        <div className="flex items-center justify-end gap-2">
          {isStreaming ? (
            <button
              type="button"
              onClick={stop}
              className="rounded-full border border-neutral-700 px-4 py-1.5 text-sm font-medium text-neutral-50 transition-colors hover:border-neutral-500 hover:bg-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-50"
            >
              Stop
            </button>
          ) : null}
          <button
            type="submit"
            disabled={isStreaming || input.trim().length === 0}
            aria-busy={isStreaming}
            className="rounded-full bg-neutral-50 px-6 py-1.5 text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-50 disabled:opacity-60"
          >
            {isStreaming ? "Sending…" : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
}
