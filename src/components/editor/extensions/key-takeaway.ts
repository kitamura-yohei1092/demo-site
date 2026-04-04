import { Node, mergeAttributes } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    keyTakeaway: {
      setKeyTakeaway: () => ReturnType;
      toggleKeyTakeaway: () => ReturnType;
    };
  }
}

export const KeyTakeaway = Node.create({
  name: "keyTakeaway",
  group: "block",
  content: "block+",
  defining: true,

  parseHTML() {
    return [{ tag: "div[data-key-takeaway]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-key-takeaway": "",
        class: "key-takeaway",
      }),
      0,
    ];
  },

  addCommands() {
    return {
      setKeyTakeaway:
        () =>
        ({ commands }) =>
          commands.wrapIn(this.name),
      toggleKeyTakeaway:
        () =>
        ({ commands }) =>
          commands.toggleWrap(this.name),
    };
  },
});
