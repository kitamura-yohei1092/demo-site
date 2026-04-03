import sanitize from "sanitize-html";

const SANITIZE_CONFIG: sanitize.IOptions = {
  allowedTags: sanitize.defaults.allowedTags.concat([
    "img",
    "h1",
    "h2",
    "h3",
    "u",
    "s",
    "sub",
    "sup",
  ]),
  allowedAttributes: {
    ...sanitize.defaults.allowedAttributes,
    a: ["href", "target", "rel"],
    img: ["src", "alt", "width", "height"],
  },
};

export function sanitizeHtml(dirty: string): string {
  return sanitize(dirty, SANITIZE_CONFIG);
}
