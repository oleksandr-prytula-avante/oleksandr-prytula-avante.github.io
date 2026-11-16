import type { ReactNode } from "react";

type TypingTextProps = {
  text: string;
  children: ReactNode;
};

export function TypingText({ text, children }: TypingTextProps) {
  return (
    <span className="typing-text">
      <span className="typing-text__reserve" aria-hidden="true">
        {text}
      </span>
      <span className="typing-text__visible">{children}</span>
    </span>
  );
}
