import React, { useState } from "react";

export default function MarkdownPreviewer() {
  const [text, setText] = useState("# Hello React\n\nType some **bold text**, *italics*, or a [link](https://react.dev).\n\n- Bullet item 1\n- Bullet item 2");

  // Simple light regex parser for basic Markdown features
  const parseMarkdown = (md) => {
    let html = md
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
      .replace(/\*(.*)\*/gim, "<em>$1</em>")
      .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2' target='_blank'>$1</a>")
      .replace(/^\- (.*$)/gim, "<li>$1</li>")
      .replace(/\n/g, "<br />");

    return html;
  };

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2>Markdown Live Editor</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <h4>Markdown Input</h4>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={12}
            style={{ width: "100%", padding: "8px", fontFamily: "monospace", boxSizing: "border-box" }}
          />
        </div>
        <div>
          <h4>HTML Preview</h4>
          <div
            style={{
              border: "1px solid #ccc",
              padding: "12px",
              minHeight: "220px",
              borderRadius: "4px",
              background: "#fafafa"
            }}
            dangerouslySetInnerHTML={{ __html: parseMarkdown(text) }}
          />
        </div>
      </div>
    </div>
  );
}
