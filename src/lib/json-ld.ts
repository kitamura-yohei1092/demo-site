/**
 * Safely serialize data for JSON-LD script tags.
 * Escapes `<` to `\u003c` to prevent `</script>` breakout (stored XSS).
 */
export function safeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
