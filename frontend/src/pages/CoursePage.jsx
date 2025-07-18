import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import LessonRenderer from "../components/LessonRenderer";

function CoursePage() {
  const [course, setCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    fetch("/course.json")
      .then((res) => res.json())
      .then((data) => setCourse(data));
  }, []);

  const handleLessonSelect = (lessonId) => {
    fetch("/lesson.json")
      .then((res) => res.json())
      .then((data) => setSelectedLesson(data));
  };

  if (!course) return <div>Loading course...</div>;

  return (
    <div style={{ display: "flex" }}>
      <Sidebar modules={course.modules} onSelectLesson={handleLessonSelect} />
      <div style={{ padding: "1rem", flex: 1 }}>
        {selectedLesson ? (
          <LessonRenderer lesson={selectedLesson} />
        ) : (
          <h2>Please choose a course</h2>
        )}
      </div>
    </div>
  );
}

export default CoursePage;
