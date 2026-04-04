import { Node, mergeAttributes } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    statHighlight: {
      setStatHighlight: (attrs?: { value?: string }) => ReturnType;
    };
  }
}

export const StatHighlight = Node.create({
  name: "statHighlight",
  group: "block",
  content: "block+",
  defining: true,

  addAttributes() {
    return {
      value: {
        default: "0",
        parseHTML: (element) => element.getAttribute("data-stat") ?? "0",
        renderHTML: (attributes) => ({
          "data-stat": attributes.value,
        }),
      },
    };
  },

  parseHTML() {
    return [{ tag: "div[data-stat]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { class: "stat-highlight" }),
      0,
    ];
  },

  addCommands() {
    return {
      setStatHighlight:
        (attrs) =>
        ({ commands }) =>
          commands.wrapIn(this.name, attrs),
    };
  },
});
