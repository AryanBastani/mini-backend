import React, { useEffect, useState } from "react";
import CourseSidebar from "../components/CourseSidebar";
import DynamicLessonRenderer from "../components/DynamicLessonRenderer";
import Chatbox from "../components/Chatbox";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/CoursePage.css";

const CoursePage = () => {
  const [course, setCourse] = useState(null);
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [chatHistories, setChatHistories] = useState({});

  const courseId = "course-quantum-computing-101";
  const userId = "123";

  useEffect(() => {
    fetch(`/api/${courseId}/?user_id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        const parsedCourse = JSON.parse(data.data);
        setCourse(parsedCourse);
      })
      .catch((err) => console.error("Failed to load course:", err));
  }, [courseId, userId]);

  useEffect(() => {
    if (!selectedLessonId) return;

    fetch(`/api/${courseId}/lesson/?lesson_id=${selectedLessonId}&user_id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        const parsedLesson = JSON.parse(data.data);
        setLesson(parsedLesson);
      })
      .catch((err) => console.error("Failed to load lesson:", err));

    if (!chatHistories[selectedLessonId]) {
      fetch(`/api/${courseId}/delivery/?lesson_id=${selectedLessonId}&user_id=${userId}`)
        .then((res) => res.json())
        .then((data) => {
          const parsedHistory = JSON.parse(data.data);
          setChatHistories(prev => ({
            ...prev,
            [selectedLessonId]: parsedHistory
          }));
        })
        .catch((err) => console.error("Failed to load conversation:", err));
    }
  }, [selectedLessonId, courseId, userId, chatHistories]);

  const handleSendMessage = (lessonId, text) => {
    if (!lessonId) return;
    
    const newMessage = {
      role: 'user',
      content: text,
      image: "" // User messages typically don't have images
    };

    setChatHistories(prev => ({
      ...prev,
      [lessonId]: [...(prev[lessonId] || []), newMessage]
    }));

    fetch(`/api/${courseId}/delivery/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lesson_id: lessonId,
        user_id: userId,
        text: text,
      }),
    })
    .then(res => res.json())
    .then(data => {
      console.log("Backend response:", data);
    })
    .catch((err) => console.error("Failed to send message:", err));
  };

  if (!course) {
    return <div className="loading-fullscreen">Loading course...</div>;
  }

  return (
    <div className="course-page-container">
      <div className="sidebar-column">
        <CourseSidebar
          course={course}
          selectedLessonId={selectedLessonId}
          onSelectLesson={(id) => setSelectedLessonId(id)}
        />
      </div>

      <main className="lesson-column">
        <div className="lesson-content-area">
          {selectedLessonId && lesson?.content?.contents ? (
            <DynamicLessonRenderer contents={lesson.content.contents} />
          ) : (
            <div className="placeholder-container">
              <h2 className="placeholder-title">Welcome to {course.title}</h2>
              <p className="placeholder-text">Please select a lesson from the sidebar to begin your learning journey.</p>
            </div>
          )}
        </div>
      </main>

      <aside className="chat-column">
        <Chatbox
          messages={chatHistories[selectedLessonId] || []}
          onSendMessage={(text) => handleSendMessage(selectedLessonId, text)}
          lessonSelected={!!selectedLessonId}
        />
      </aside>
    </div>
  );
};

export default CoursePage;