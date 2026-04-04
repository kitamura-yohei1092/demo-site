import { Node, mergeAttributes } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    inlineCta: {
      setInlineCta: (attrs?: { href?: string }) => ReturnType;
    };
  }
}

export const InlineCta = Node.create({
  name: "inlineCta",
  group: "block",
  content: "block+",
  defining: true,

  addAttributes() {
    return {
      href: {
        default: "#",
        parseHTML: (element) => element.getAttribute("data-cta-href") ?? "#",
        renderHTML: (attributes) => ({
          "data-cta-href": attributes.href,
        }),
      },
    };
  },

  parseHTML() {
    return [{ tag: "div[data-cta-href]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { class: "inline-cta" }),
      0,
    ];
  },

  addCommands() {
    return {
      setInlineCta:
        (attrs) =>
        ({ commands }) =>
          commands.wrapIn(this.name, attrs),
    };
  },
});
