import { PrismTheme } from "prism-react-renderer";

const draculaTheme: PrismTheme = {
  plain: {
    color: "#F8F8F2",
    backgroundColor: "#282A36",
  },
  styles: [
    {
      types: ["prolog", "constant", "builtin"],
      style: {
        color: "#FF79C6",
      },
    },
    {
      types: ["inserted", "function"],
      style: {
        color: "#50FA7B",
      },
    },
    {
      types: ["deleted"],
      style: {
        color: "#FF5555",
      },
    },
    {
      types: ["changed"],
      style: {
        color: "#FFB86C",
      },
    },
    {
      types: ["punctuation", "symbol"],
      style: {
        color: "#F8F8F2",
      },
    },
    {
      types: ["string", "char", "tag", "selector"],
      style: {
        color: "#FF79C6",
      },
    },
    {
      types: ["keyword", "variable"],
      style: {
        color: "#BD93F9",
        fontStyle: "italic",
      },
    },
    {
      types: ["comment"],
      style: {
        color: "#6272A4",
      },
    },
    {
      types: ["attr-name"],
      style: {
        color: "#50FA7B",
      },
    },
  ],
};

const githubTheme: PrismTheme = {
  plain: {
    color: "#24292e",
    backgroundColor: "#ffffff",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: {
        color: "#6a737d",
        fontStyle: "italic",
      },
    },
    {
      types: ["namespace"],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ["string", "attr-value"],
      style: {
        color: "#032f62",
      },
    },
    {
      types: ["punctuation", "operator"],
      style: {
        color: "#24292e",
      },
    },
    {
      types: ["entity", "url", "symbol", "number", "boolean", "variable", "constant", "property", "regex", "inserted"],
      style: {
        color: "#005cc5",
      },
    },
    {
      types: ["atrule", "keyword", "attr-name", "selector"],
      style: {
        color: "#d73a49",
      },
    },
    {
      types: ["function", "deleted", "tag"],
      style: {
        color: "#6f42c1",
      },
    },
    {
      types: ["function-variable"],
      style: {
        color: "#005cc5",
      },
    },
    {
      types: ["tag", "selector", "keyword"],
      style: {
        color: "#22863a",
      },
    },
  ],
};

export { draculaTheme, githubTheme };