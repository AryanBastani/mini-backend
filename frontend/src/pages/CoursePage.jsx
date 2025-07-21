import React, { useEffect, useState } from "react";
import CourseSidebar from "../components/CourseSidebar";
import DynamicLessonRenderer from "../components/DynamicLessonRenderer";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/CoursePage.css";

const CoursePage = () => {
  const [course, setCourse] = useState(null);
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [lesson, setLesson] = useState(null);

  const courseId = "course-quantum-computing-101";
  const userId = "123"; 

  useEffect(() => {
    fetch("/api/${courseId}/?user_id=${userId}")
      .then((res) => res.json())
      .then((data) => {
        const parsedCourse = JSON.parse(data.data);
        setCourse(parsedCourse);
        console.log("Course:", parsedCourse);
      })
      .catch((err) => console.error("Failed to load course:", err));
  }, []);

  useEffect(() => {
    if (!selectedLessonId) return;
    
    fetch(`/api/${courseId}/lesson/?lesson_id=${selectedLessonId}&user_id=${userId}`)
    .then((res) => res.json())
    .then((data) => {
      const parsedLesson = JSON.parse(data.data);  // backend returns a stringified JSON
      setLesson(parsedLesson);
    })
    .catch((err) => {
      console.error("Failed to load lesson:", err);
    });
  }, [selectedLessonId]);

  if (!course) return <div className="loading">Loading course...</div>;

  return (
    <div className="course-page">
      <div className="sidebar-container">
        <CourseSidebar
          course={course}
          selectedLessonId={selectedLessonId}
          onSelectLesson={(id) => setSelectedLessonId(id)}
        />
      </div>

      <div className="lesson-wrapper">
        <main className="lesson-content">
          {selectedLessonId && lesson?.content?.contents ? (
            <DynamicLessonRenderer contents={lesson.content.contents} />
          ) : (
            <div className="placeholder-message">
              Please select a lesson from the sidebar.
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CoursePage;