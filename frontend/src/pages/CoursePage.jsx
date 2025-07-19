// src/pages/CoursePage.jsx
import React, { useState, useEffect } from 'react';
import CourseSidebar from '../components/CourseSidebar';
import DynamicLessonRenderer from '../components/DynamicLessonRenderer';

const CoursePage = () => {
  const [courseData, setCourseData] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [lessonContent, setLessonContent] = useState(null);

  // useEffect(() => {
  //   fetch('/api/course-quantum-computing-101')
  //     .then(res => res.json())
  //     .then(data => setCourseData(data));
  // }, []);

    useEffect(() => {
    fetch("/course.json")
      .then((res) => res.json())
      .then((data) => setCourseData(data));
  }, []);

  useEffect(() => {
    if (selectedLesson) {
      fetch(`/api/course-quantum-computing-101/lesson/?lesson_id=${selectedLesson}`)
        .then(res => res.json())
        .then(data => setLessonContent(data.page_contents));
    }
  }, [selectedLesson]);

  if (!courseData) return <div className="p-4">Loading course...</div>;

  // const [course, setCourse] = useState(null);
  // const [selectedLesson, setSelectedLesson] = useState(null);

  // useEffect(() => {
  //   fetch("/course.json")
  //     .then((res) => res.json())
  //     .then((data) => setCourse(data));
  // }, []);

  // const handleLessonSelect = (lessonId) => {
  //   fetch("/lesson.json")
  //     .then((res) => res.json())
  //     .then((data) => setSelectedLesson(data));
  // };

  // if (!course) return <div>Loading course...</div>;

  return (
    <div className="d-flex">
      <CourseSidebar
        course={courseData}
        selectedLessonId={selectedLesson}
        onSelectLesson={setSelectedLesson}
      />
      <div className="p-4 flex-grow-1">
        {lessonContent ? (
          <DynamicLessonRenderer contents={lessonContent} />
        ) : (
          <p className="text-muted">Please select a lesson to begin.</p>
        )}
      </div>
    </div>
  );
};

export default CoursePage;
