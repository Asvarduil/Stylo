// src/lang/lexer.ts
export type Token =
  | { type: "selector"; value: string }
  | { type: "property"; value: string }
  | { type: "value"; value: string }
  | { type: "state"; value: string };

export function lexer(input: string): Token[] {
  const regex = /(\.[a-zA-Z0-9_-]+)|(\b(color|background-color)\b)|(#([0-9a-fA-F]{6}|[0-9a-fA-F]{3}))|(\b(on \w+)\b)/g;
  const tokens: Token[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(input))) {
    if (match[1]) {
      tokens.push({ type: "selector", value: match[1] });
    } else if (match[2]) {
      tokens.push({ type: "property", value: match[2] });
    } else if (match[3]) {
      tokens.push({ type: "value", value: match[3] });
    } else if (match[4]) {
      tokens.push({ type: "state", value: match[4] });
    }
  }

  return tokens;
}
