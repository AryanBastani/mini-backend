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
  // State to hold chat history for ALL lessons, keyed by lessonId
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

    // Fetch lesson content
    fetch(`/api/${courseId}/lesson/?lesson_id=${selectedLessonId}&user_id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        const parsedLesson = JSON.parse(data.data);
        setLesson(parsedLesson);
      })
      .catch((err) => console.error("Failed to load lesson:", err));

    // Fetch chat history only if it's not already loaded
    if (!chatHistories[selectedLessonId]) {
      fetch(`/api/${courseId}/delivery/?lesson_id=${selectedLessonId}&user_id=${userId}`)
        .then((res) => res.json())
        .then((data) => {
          // The backend returns a stringified JSON, so we parse it.
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

    // Optimistically update the UI
    setChatHistories(prev => ({
      ...prev,
      [lessonId]: [...(prev[lessonId] || []), newMessage]
    }));

    // POST the new message to the backend
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
      // Here you might handle a response from the tutor if the backend provides one
      console.log("Backend response:", data);
    })
    .catch((err) => console.error("Failed to send message:", err));
  };

  if (!course) return <div className="loading">Loading course...</div>;

  return (
    <div className="course-page d-flex">
      <div className="sidebar-container">
        <CourseSidebar
          course={course}
          selectedLessonId={selectedLessonId}
          onSelectLesson={(id) => setSelectedLessonId(id)}
        />
      </div>

      <div className="lesson-wrapper flex-grow-1">
        <main className="lesson-content p-4">
          {selectedLessonId && lesson?.content?.contents ? (
            <DynamicLessonRenderer contents={lesson.content.contents} />
          ) : (
            <div className="placeholder-message">
              Please select a lesson from the sidebar.
            </div>
          )}
        </main>
      </div>

      <div className="chat-container">
        <Chatbox
          messages={chatHistories[selectedLessonId] || []}
          onSendMessage={(text) => handleSendMessage(selectedLessonId, text)}
        />
      </div>
    </div>
  );
};

export default CoursePage;