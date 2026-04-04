export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

/**
 * Extract h2/h3 headings from HTML and return TOC items.
 */
export function extractToc(html: string): TocItem[] {
  const regex = /<h([23])[^>]*>(.*?)<\/h[23]>/gi;
  const items: TocItem[] = [];
  let match;

  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1], 10) as 2 | 3;
    const text = match[2].replace(/<[^>]*>/g, "").trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    items.push({ id, text, level });
  }

  return items;
}

/**
 * Inject id attributes into h2/h3 tags to match TOC anchors.
 */
export function addHeadingIds(html: string, items: TocItem[]): string {
  let index = 0;
  return html.replace(/<h([23])([^>]*)>/gi, (fullMatch, level, attrs) => {
    if (index < items.length) {
      const item = items[index];
      index++;
      return `<h${level}${attrs} id="${item.id}">`;
    }
    return fullMatch;
  });
}
