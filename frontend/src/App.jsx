import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserProfilePage from './pages/UserProfilePage';
import CoursePage from './pages/CoursePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserProfilePage userId="123" />} />
      <Route path="/course" element={<CoursePage />} />
    </Routes>
  );
}

export default App;
