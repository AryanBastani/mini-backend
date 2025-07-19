import React from "react";
import ReactMarkdown from "react-markdown";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";


function DynamicLessonRenderer({ contents }) {
  return (
    <div>
      {contents.map((item, index) => {
        switch (item.type) {
          case "text":
            return <p key={index}>{item.value}</p>;

          case "markdown":
            return <ReactMarkdown key={index}>{item.value}</ReactMarkdown>;

          case "latex":
            return (
              <div key={index} style={{ margin: "1rem 0" }}>
                <BlockMath math={item.value} />
              </div>
            );

          case "image":
            return (
              <img
                key={index}
                src={`/${item.src}`}
                alt={item.alt || "image"}
                style={{ width: "80%", margin: "1rem 0" }}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

export default DynamicLessonRenderer;
