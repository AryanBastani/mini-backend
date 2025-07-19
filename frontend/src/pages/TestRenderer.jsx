import { useEffect, useState } from "react";
import DynamicLessonRenderer from "../components/DynamicLessonRenderer";

function TestRenderer() {
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    fetch("/lesson.json")
      .then(res => res.json())
      .then(data => setLesson(data));
  }, []);

  if (!lesson) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{lesson.title}</h1>
      <DynamicLessonRenderer contents={lesson.content.contents} />
    </div>
  );
}

export default TestRenderer;
