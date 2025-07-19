import React, { useEffect, useState } from "react";
import CourseSidebar from "../components/CourseSidebar";
import DynamicLessonRenderer from "../components/DynamicLessonRenderer";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/CoursePage.css";

const CoursePage = () => {
  const [course, setCourse] = useState(null);
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    fetch("/course.json")
      .then((res) => res.json())
      .then((data) => setCourse(data));
  }, []);

  useEffect(() => {
    if (!selectedLessonId) return;
    fetch("/lesson.json")
      .then((res) => res.json())
      .then((data) => setLesson(data));
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