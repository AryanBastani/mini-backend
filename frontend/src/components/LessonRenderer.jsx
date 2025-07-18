import ReactMarkdown from "react-markdown";

function LessonRenderer({ lesson }) {
  return (
    <div>
      <h2>{lesson.title}</h2>
      <p><strong>🎯 Purpose of course:</strong> {lesson.learning_objective}</p>
      <p><strong>📚 Main desciption:</strong> {lesson.content.core_explanation}</p>
      <ul>
        {lesson.content.key_terms.map((term, index) => (
          <li key={index}>🔑 {term}</li>
        ))}
      </ul>

      {lesson.content.contents.map((item, index) => {
        switch (item.type) {
          case "text":
            return <p key={index}>{item.value}</p>;
          case "markdown":
            return <ReactMarkdown key={index}>{item.value}</ReactMarkdown>;
          case "latex":
            return <div key={index}><code>{item.value}</code></div>; 
          case "image":
            return (
              <img
                key={index}
                src={`/${item.src}`}
                alt={item.alt}
                style={{ width: "80%", margin: "1rem auto" }}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export default LessonRenderer;
