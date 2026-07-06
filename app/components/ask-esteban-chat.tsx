"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
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
  variant?: "classic" | "lab" | "home";
  className?: string;
};

const askEstebanPrompts = [
  "Give me the 30-second recruiter summary.",
  "Why is Esteban a fit for AI product roles?",
  "Summarize his Coinbase work with metrics.",
  "What proof points should a hiring manager know?",
  "How technical is he?",
  "Show me PM-relevant experience.",
];

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const pendingStages = [
  "Reading the portfolio context...",
  "Scanning proof points and work history...",
  "Checking role-fit notes...",
  "Drafting the answer...",
];

/* Staged status so a several-second answer never looks hung. */
function PendingStatus() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setStage((current) => Math.min(current + 1, pendingStages.length - 1));
    }, 1700);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <p className="mt-2 text-xs font-bold">
      {pendingStages[stage]}
      <span className="ml-1 inline-block h-3 w-1.5 translate-y-[2px] animate-pulse bg-current opacity-70" />
    </p>
  );
}

/*
 * Answers come back with light markdown (bold + bullets). Render just that
 * subset instead of showing literal asterisks.
 */
function renderInlineMarkdown(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={index}>{part.slice(2, -2)}</strong>
    ) : (
      part
    )
  );
}

function MessageBody({ content }: { content: string }) {
  const blocks: ReactNode[] = [];
  const lines = content.split(/\r?\n/);
  let bullets: string[] = [];
  let key = 0;

  const flushBullets = () => {
    if (!bullets.length) return;
    blocks.push(
      <ul key={`list-${key++}`} className="space-y-1">
        {bullets.map((item, index) => (
          <li key={index} className="flex gap-2">
            <span
              aria-hidden="true"
              className="mt-[5px] h-1 w-1 shrink-0 bg-current opacity-60"
            />
            <span>{renderInlineMarkdown(item)}</span>
          </li>
        ))}
      </ul>
    );
    bullets = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    const bulletMatch = line.match(/^[-*•]\s+(.*)$/);

    if (bulletMatch) {
      bullets.push(bulletMatch[1]);
      continue;
    }

    flushBullets();

    if (line) {
      blocks.push(<p key={`text-${key++}`}>{renderInlineMarkdown(line)}</p>);
    }
  }

  flushBullets();

  return <div className="mt-2 space-y-1.5 text-xs leading-relaxed">{blocks}</div>;
}

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
  const isHome = variant === "home";
  const [messages, setMessages] = useState<AskMessage[]>([
    {
      role: "assistant",
      content:
        "I am the portfolio assistant for Esteban. Ask for a recruiter summary, Coinbase proof, AI/product fit, technical depth, projects, education, or role alignment.",
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
      className={cx(
        "gap-2",
        isLab
          ? "rounded-[2px] border p-2 hairline bg-base-100"
          : isHome
            ? "flex"
            : "flex flex-col sm:flex-row"
      )}
    >
      <label className="sr-only" htmlFor={inputId}>
        Ask Esteban a question
      </label>
      {isLab ? (
        <>
          <textarea
            id={inputId}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about Coinbase, role fit, proof points, or technical depth..."
            className="min-h-28 w-full resize-none rounded-md bg-transparent px-3 py-3 text-sm font-semibold leading-relaxed outline-none placeholder:text-base-content/35 disabled:opacity-50"
            maxLength={500}
            disabled={isPending}
          />
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-base-content/10 px-2 pt-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-base-content/42">
              Public portfolio context + source labels
            </span>
            <button
              type="submit"
              disabled={isPending || input.trim().length === 0}
              className="draft-btn draft-btn-fill shrink-0 transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              Ask AI
            </button>
          </div>
        </>
      ) : (
        <>
          <input
            id={inputId}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={
              isHome
                ? "Ask about proof or role fit..."
                : "Ask about Coinbase, PM fit, technical depth..."
            }
            className={cx(
              "min-h-10 min-w-0 flex-1 px-3 py-2 text-sm font-bold outline-none disabled:opacity-50",
              isHome
                ? "min-h-12 rounded-[2px] border hairline bg-base-100 font-medium placeholder:text-base-content/35 focus:ring-2 focus:ring-primary/45"
                : "border border-black bg-white shadow-[1px_1px_0_rgba(255,255,255,0.9)_inset] placeholder:text-black/40 focus:ring-2 focus:ring-black"
            )}
            maxLength={500}
            disabled={isPending}
          />
          <button
            type="submit"
            disabled={isPending || input.trim().length === 0}
            className={cx(
              "transition disabled:cursor-not-allowed disabled:opacity-50",
              isHome
                ? "draft-btn draft-btn-fill shrink-0"
                : "border border-black bg-black px-4 py-2 text-sm font-black text-white shadow-[2px_2px_0_rgba(0,0,0,0.32)] hover:bg-white hover:text-black"
            )}
          >
            Send
          </button>
        </>
      )}
    </form>
  );

  return (
    <div
      className={cx(
        isLab || isHome ? "space-y-3" : "space-y-2 sm:space-y-3",
        isLab && "rounded-[2px] border p-4 hairline bg-base-100 md:p-5 lg:p-6",
        isHome && "border p-4 hairline bg-base-100 sm:p-5",
        className
      )}
    >
      <div
        className={cx(
          isLab && "grid gap-4 md:grid-cols-[1fr_auto] md:items-start"
        )}
      >
        <div>
          <p
            className={cx(
              isLab || isHome
                ? "annotation"
                : "text-[10px] uppercase tracking-[0.18em]",
              isLab || isHome ? "text-primary" : "text-black/60"
            )}
          >
            {isLab
              ? "Portfolio AI chat"
              : isHome
                ? "Portfolio assistant"
                : "Ask Esteban OS"}
          </p>
          <h3
            className={cx(
              "mt-1 max-w-2xl leading-tight",
              isLab
                ? "mt-2 font-display text-2xl font-semibold uppercase tracking-[0.02em] text-base-content md:text-3xl"
                : isHome
                  ? "mt-2 font-display text-2xl font-semibold uppercase tracking-[0.02em] text-base-content"
                  : "text-base font-black sm:text-xl"
            )}
          >
            {isLab
              ? "Ask for the hiring signal."
              : isHome
                ? "Turn the portfolio into a recruiter-ready answer."
                : "Skip the browsing. Ask for the signal directly."}
          </h3>
        </div>
        {isLab ? (
          <div className="flex flex-wrap gap-2 md:justify-end">
            {["Portfolio-grounded", "Sources shown", "Recruiter-ready"].map((item) => (
              <span
                key={item}
                className="border px-2.5 py-1 hairline font-mono text-[10px] uppercase tracking-[0.1em] text-base-content/65"
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
            : isHome
              ? "text-sm text-base-content/64"
              : "hidden text-xs text-black/75 sm:block"
        )}
      >
        This is a focused portfolio assistant, not a general chatbot. It answers
        from Esteban's work history, projects, metrics, role-fit notes, and
        source labels.
      </p>

      <div
        className={cx(
          "grid gap-3",
          isLab
            ? "lg:grid-cols-[minmax(0,1fr)_300px]"
            : isHome
              ? "lg:grid-cols-[minmax(0,1fr)_220px]"
              : "lg:grid-cols-[0.78fr_1.22fr]"
        )}
      >
        <div
          className={cx(
            "space-y-2",
            isLab || isHome ? "order-1" : "order-1 lg:order-2"
          )}
        >
          {isLab ? <div className="pb-1">{chatForm}</div> : null}
          {isHome ? chatForm : null}
          <div
            ref={messageListRef}
            className={cx(
              "space-y-2 overflow-y-auto",
              isLab
                ? "min-h-[280px] max-h-[760px] rounded-[2px] border hairline bg-base-200/40 p-4 sm:min-h-[420px] md:min-h-[500px] lg:min-h-[560px]"
                : isHome
                  ? "min-h-[180px] max-h-[260px] rounded-[2px] border hairline bg-base-200/40 p-3"
                  : "max-h-[102px] border border-black bg-[#efefef] p-2 shadow-[1px_1px_0_rgba(255,255,255,0.9)_inset] sm:max-h-[172px] lg:max-h-[214px]"
            )}
          >
            {messages.map((message, index) => (
              <article
                key={`${message.role}-${index}`}
                className={cx(
                  isLab || isHome
                    ? "rounded-[2px] border p-3"
                    : "border border-black p-2 shadow-[2px_2px_0_rgba(0,0,0,0.28)]",
                  message.role === "user"
                    ? isLab
                      ? "ml-auto max-w-[86%] border-primary/25 bg-primary text-primary-content"
                      : isHome
                        ? "ml-auto max-w-[86%] border-primary/25 bg-primary text-primary-content"
                        : "ml-auto max-w-[86%] bg-black text-white"
                    : isLab
                      ? "mr-auto max-w-[96%] border-base-content/12 bg-base-100 text-base-content"
                      : isHome
                        ? "mr-auto max-w-[96%] border-base-content/12 bg-base-100 text-base-content"
                        : "mr-auto max-w-[96%] bg-[#f7f7f7] text-black"
                )}
              >
                <p className="text-[10px] font-black uppercase tracking-[0.14em] opacity-65">
                  {message.role === "user" ? "You" : "Portfolio Assistant"}
                </p>
                <MessageBody content={message.content} />
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
                  isLab || isHome
                    ? "rounded-[2px] border hairline bg-base-100 text-base-content"
                    : "border border-black bg-[#f7f7f7] text-black shadow-[2px_2px_0_rgba(0,0,0,0.28)]"
                )}
              >
                <p className="text-[10px] font-black uppercase tracking-[0.14em] opacity-65">
                  Portfolio Assistant
                </p>
                <PendingStatus />
              </article>
            ) : null}
          </div>

          {!isLab && !isHome ? chatForm : null}
        </div>

        <div
          className={cx(
            "grid gap-2",
            isLab
              ? "order-2 sm:grid-cols-2 lg:grid-cols-1"
              : isHome
                ? "order-2 grid-cols-1"
                : "order-2 sm:grid-cols-2 lg:order-1 lg:grid-cols-1"
          )}
        >
          {isLab ? (
            <div className="rounded-[2px] border border-primary/40 bg-primary/5 px-4 py-3">
              <p className="annotation text-primary">Question templates</p>
              <p className="mt-1.5 text-xs leading-relaxed text-base-content/62">
                Start with the questions hiring teams usually ask first.
              </p>
            </div>
          ) : null}
          {askEstebanPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => void submitQuestion(prompt)}
              className={cx(
                "text-left text-xs leading-snug transition disabled:opacity-50",
                isLab
                  ? "rounded-[2px] border hairline bg-base-100 px-4 py-3 font-medium text-base-content/75 hover:border-primary hover:text-base-content"
                  : isHome
                    ? "rounded-[2px] border hairline bg-base-100 px-4 py-3 font-medium text-base-content/75 hover:border-primary hover:text-base-content"
                    : "border border-black bg-[#f7f7f7] px-3 py-2 font-black shadow-[1px_1px_0_rgba(255,255,255,0.9)_inset,2px_2px_0_rgba(0,0,0,0.35)] hover:bg-black hover:text-white"
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
