type TypingCursorProps = {
  color?: string;
};

export function TypingCursor({ color }: TypingCursorProps) {
  return (
    <span
      className="typing-cursor ml-1"
      style={color ? { color } : undefined}
      aria-hidden="true"
    >
      |
    </span>
  );
}
