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
    "aside",
  ]),
  allowedAttributes: {
    ...sanitize.defaults.allowedAttributes,
    a: ["href", "target", "rel"],
    img: ["src", "alt", "width", "height"],
    h2: ["id"],
    h3: ["id"],
    div: ["data-callout", "data-stat", "data-key-takeaway", "data-cta-href", "class"],
    aside: ["data-pull-quote", "class"],
  },
};

export function sanitizeHtml(dirty: string): string {
  return sanitize(dirty, SANITIZE_CONFIG);
}
