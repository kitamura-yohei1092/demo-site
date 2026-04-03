import DOMPurify from "isomorphic-dompurify";

const PURIFY_CONFIG = {
  ADD_ATTR: ["target", "rel"],
};

export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, PURIFY_CONFIG);
}
