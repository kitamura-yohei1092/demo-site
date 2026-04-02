export function isValidHttpUrl(input: string): boolean {
  try {
    const parsed = new URL(input);
    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return false;
  }
}
