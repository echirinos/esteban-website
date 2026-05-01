"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";

type AskMessage = {
  role: "user" | "assistant";
  content: string;
  provider?: string;
  sources?: string[];
  setup?: string;
};

type AskResponse = {
  answer?: string;
  error?: string;
  provider?: string;
  sources?: string[];
  setup?: string;
};

type AskEstebanChatProps = {
  variant?: "classic" | "lab";
  className?: string;
};

const askEstebanPrompts = [
  "Why is Esteban a fit for AI product roles?",
  "Summarize his Coinbase work.",
  "What proof points should a recruiter know?",
  "How technical is he?",
  "What roles is he best aligned with?",
  "Show me PM-relevant experience.",
];

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

async function readAskResponse(response: Response): Promise<AskResponse> {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const data = (await response.json().catch(() => null)) as AskResponse | null;

    if (!data) {
      throw new Error("Ask Esteban received an unreadable response.");
    }

    return data;
  }

  const text = await response.text().catch(() => "");
  const cleanText = text.trim();

  if (response.status === 504 || /timeout|FUNCTION_INVOCATION_TIMEOUT/i.test(cleanText)) {
    throw new Error(
      "Ask Esteban took too long to answer. Try again, or ask a shorter question."
    );
  }

  throw new Error(
    cleanText.split("\n")[0] || `Ask Esteban is unavailable. HTTP ${response.status}.`
  );
}

export function AskEstebanChat({
  variant = "classic",
  className,
}: AskEstebanChatProps) {
  const inputId = useId();
  const isLab = variant === "lab";
  const [messages, setMessages] = useState<AskMessage[]>([
    {
      role: "assistant",
      content:
        "I can answer like a live portfolio chat. Ask about Esteban's Coinbase work, AI/product fit, technical depth, proof points, education, or the role he is best aligned with.",
      sources: ["Role Fit", "Receipts.txt"],
    },
  ]);
  const [input, setInput] = useState("");
  const [isPending, setIsPending] = useState(false);
  const messageListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messageListRef.current?.scrollTo({
      top: messageListRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isPending]);

  const submitQuestion = async (question: string) => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion || isPending) return;

    const nextMessages: AskMessage[] = [
      ...messages,
      { role: "user", content: trimmedQuestion },
    ];

    setMessages(nextMessages);
    setInput("");
    setIsPending(true);

    try {
      const response = await fetch("/api/ask-esteban", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      });

      const data = await readAskResponse(response);

      if (!response.ok || !data.answer) {
        throw new Error(data.error || "Ask Esteban is unavailable.");
      }

      const answer = data.answer;

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content: answer,
          provider: data.provider,
          sources: data.sources,
          setup: data.setup,
        },
      ]);
    } catch (error) {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "Ask Esteban could not answer right now.",
        },
      ]);
    } finally {
      setIsPending(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submitQuestion(input);
  };

  const chatForm = (
    <form
      onSubmit={handleSubmit}
      className={cx("gap-2", isLab ? "flex" : "flex flex-col sm:flex-row")}
    >
      <label className="sr-only" htmlFor={inputId}>
        Ask Esteban a question
      </label>
      <input
        id={inputId}
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder={
          isLab
            ? "Ask about Coinbase, AI fit..."
            : "Ask about Coinbase, PM fit, technical depth..."
        }
        className={cx(
          "min-h-10 min-w-0 flex-1 px-3 py-2 text-sm font-bold outline-none disabled:opacity-50",
          isLab
            ? "min-h-12 rounded-2xl border border-base-content/12 bg-base-100 placeholder:text-base-content/35 focus:ring-2 focus:ring-primary/45"
            : "border border-black bg-white shadow-[1px_1px_0_rgba(255,255,255,0.9)_inset] placeholder:text-black/40 focus:ring-2 focus:ring-black"
        )}
        maxLength={500}
        disabled={isPending}
      />
      <button
        type="submit"
        disabled={isPending || input.trim().length === 0}
        className={cx(
          "px-4 py-2 text-sm font-black transition disabled:cursor-not-allowed disabled:opacity-50",
          isLab
            ? "shrink-0 rounded-2xl bg-base-content px-5 text-base-100 hover:bg-primary hover:text-primary-content sm:px-6"
            : "border border-black bg-black text-white shadow-[2px_2px_0_rgba(0,0,0,0.32)] hover:bg-white hover:text-black"
        )}
      >
        {isLab ? "Ask" : "Send"}
      </button>
    </form>
  );

  return (
    <div
      className={cx(
        isLab ? "space-y-3" : "space-y-2 sm:space-y-3",
        isLab &&
          "rounded-[28px] border border-base-content/12 bg-base-100/95 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.1)] backdrop-blur md:p-6 lg:p-7",
        className
      )}
    >
      <div className={cx(isLab && "grid gap-4 md:grid-cols-[1fr_auto] md:items-start")}>
        <div>
          <p
            className={cx(
              "text-[10px] uppercase tracking-[0.18em]",
              isLab ? "text-primary" : "text-black/60"
            )}
          >
            {isLab ? "Live portfolio chat" : "Ask Esteban OS"}
          </p>
          <h3
            className={cx(
              "mt-1 max-w-2xl font-black leading-tight",
              isLab ? "text-3xl text-base-content md:text-4xl" : "text-base sm:text-xl"
            )}
          >
            {isLab
              ? "Chat with the proof, projects, and role-fit signal."
              : "Skip the browsing. Ask for the signal directly."}
          </h3>
        </div>
        {isLab ? (
          <div className="flex flex-wrap gap-2 md:justify-end">
            {["Try a question", "Grounded answers", "Sources shown"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-base-content/12 bg-base-200/70 px-3 py-1 text-xs font-semibold text-base-content/70"
              >
                {item}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <p
        className={cx(
          "max-w-2xl leading-relaxed",
          isLab
            ? "text-sm text-base-content/68"
            : "hidden text-xs text-black/75 sm:block"
        )}
      >
        Type a question about Esteban's work, AI product judgment, Coinbase
        experience, technical depth, education, or recruiter-ready proof points.
      </p>

      <div
        className={cx(
          "grid gap-3",
          isLab
            ? "lg:grid-cols-[minmax(0,1fr)_300px]"
            : "lg:grid-cols-[0.78fr_1.22fr]"
        )}
      >
        <div
          className={cx(
            "space-y-2",
            isLab ? "order-1" : "order-1 lg:order-2"
          )}
        >
          {isLab ? chatForm : null}
          <div
            ref={messageListRef}
            className={cx(
              "space-y-2 overflow-y-auto",
              isLab
                ? "min-h-[160px] max-h-[520px] rounded-2xl border border-base-content/12 bg-base-200/35 p-3 sm:min-h-[220px] md:min-h-[380px] lg:min-h-[430px]"
                : "max-h-[102px] border border-black bg-[#efefef] p-2 shadow-[1px_1px_0_rgba(255,255,255,0.9)_inset] sm:max-h-[172px] lg:max-h-[214px]"
            )}
          >
            {messages.map((message, index) => (
              <article
                key={`${message.role}-${index}`}
                className={cx(
                  isLab
                    ? "rounded-2xl border p-3"
                    : "border border-black p-2 shadow-[2px_2px_0_rgba(0,0,0,0.28)]",
                  message.role === "user"
                    ? isLab
                      ? "ml-auto max-w-[86%] border-primary/25 bg-primary text-primary-content"
                      : "ml-auto max-w-[86%] bg-black text-white"
                    : isLab
                      ? "mr-auto max-w-[96%] border-base-content/12 bg-base-100 text-base-content"
                      : "mr-auto max-w-[96%] bg-[#f7f7f7] text-black"
                )}
              >
                <p className="text-[10px] font-black uppercase tracking-[0.14em] opacity-65">
                  {message.role === "user" ? "You" : "Ask Esteban"}
                  {message.provider ? ` / ${message.provider}` : ""}
                </p>
                <p className="mt-2 whitespace-pre-wrap text-xs leading-relaxed">
                  {message.content}
                </p>
                {message.sources?.length ? (
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.12em] opacity-60">
                    Sources: {message.sources.join(", ")}
                  </p>
                ) : null}
                {message.setup ? (
                  <p className="mt-2 border-t border-current/20 pt-2 text-[10px] leading-relaxed opacity-70">
                    {message.setup}
                  </p>
                ) : null}
              </article>
            ))}
            {isPending ? (
              <article
                className={cx(
                  "mr-auto max-w-[92%] p-2",
                  isLab
                    ? "rounded-2xl border border-base-content/12 bg-base-100 text-base-content"
                    : "border border-black bg-[#f7f7f7] text-black shadow-[2px_2px_0_rgba(0,0,0,0.28)]"
                )}
              >
                <p className="text-[10px] font-black uppercase tracking-[0.14em] opacity-65">
                  Ask Esteban
                </p>
                <p className="mt-2 text-xs font-bold">Thinking...</p>
              </article>
            ) : null}
          </div>

          {!isLab ? chatForm : null}
        </div>

        <div
          className={cx(
            "grid gap-2",
            isLab
              ? "order-2 sm:grid-cols-2 lg:grid-cols-1"
              : "order-2 sm:grid-cols-2 lg:order-1 lg:grid-cols-1"
          )}
        >
          {askEstebanPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => void submitQuestion(prompt)}
              className={cx(
                "text-left text-xs font-black leading-snug transition disabled:opacity-50",
                isLab
                  ? "rounded-2xl border border-base-content/12 bg-base-200/55 px-4 py-3 text-base-content hover:border-primary/45 hover:bg-primary/10"
                  : "border border-black bg-[#f7f7f7] px-3 py-2 shadow-[1px_1px_0_rgba(255,255,255,0.9)_inset,2px_2px_0_rgba(0,0,0,0.35)] hover:bg-black hover:text-white"
              )}
              disabled={isPending}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
