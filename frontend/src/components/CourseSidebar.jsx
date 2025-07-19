// src/components/CourseSidebar.jsx
import React, { useState } from 'react';
import '../styles/CourseSidebar.css';

const CourseSidebar = ({ course, selectedLessonId, onSelectLesson }) => {
  const [expandedModule, setExpandedModule] = useState(null);

  const toggleModule = (moduleId) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  return (
    <div className="course-sidebar">
      <div className="course-header mb-3">
        <h4>{course.title}</h4>
        <p className="text-muted small">{course.description}</p>
      </div>

      <div className="accordion" id="courseModules">
        {course.modules.map((mod, modIndex) => (
          <div className="accordion-item" key={mod.id}>
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${expandedModule === mod.id ? '' : 'collapsed'}`}
                onClick={() => toggleModule(mod.id)}
              >
                {mod.title}
              </button>
            </h2>
            <div
              className={`accordion-collapse collapse ${expandedModule === mod.id ? 'show' : ''}`}
            >
              <div className="accordion-body p-0">
                {mod.lectures.map((lec) => (
                  <div key={lec.id} className="lecture-block px-3 py-2">
                    <strong className="small text-secondary">{lec.title}</strong>
                    <ul className="list-unstyled lesson-list ps-3 mt-1">
                      {lec.lessons.map((lesson) => (
                        <li
                          key={lesson.id}
                          className={`lesson-item ${lesson.id === selectedLessonId ? 'active' : ''}`}
                          onClick={() => onSelectLesson(lesson.id)}
                        >
                          {lesson.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseSidebar;
