// src/pages/UserProfilePage.jsx
import React, { useState, useEffect } from 'react';
import ProfileForm from '../components/forms/ProfileForm';
import { Spinner } from 'react-bootstrap'; // Assuming you use Spinner for loading

const UserProfilePage = ({ userId }) => {
  const [profileData, setProfileData] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // You would typically fetch initial profile data here
  // useEffect(() => {
  //   const fetchCurrentProfile = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await fetch(`/api/profile/${userId}`); // Example GET endpoint
  //       if (response.ok) {
  //         const data = await response.json();
  //         setProfileData(data); // Set initial form data
  //       } else {
  //         setError('Failed to fetch current profile data.');
  //       }
  //     } catch (err) {
  //       setError('Network error fetching profile.');
  //     //  setProfileData({}); // Consider setting to empty object on error too
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchCurrentProfile();
  // }, [userId]);


  const handleProfileSubmit = async (formData) => {
    setMessage('');
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/profile/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          gender: formData.gender,
        }),
      });

      if (response.ok) {
        setMessage('Profile updated successfully!');
        // Optionally, refetch profile data here to ensure UI is updated
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to update profile.');
      }
    } catch (err) {
      setError('Network error or server issue.');
      console.error('Profile update error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">User Profile Settings</h2>
      {loading && <div className="text-center"><Spinner animation="border" size="sm" /> Loading profile...</div>}
      <ProfileForm
        initialData={profileData || {}} 
        onSubmit={handleProfileSubmit}
        message={message}
        error={error}
      />
    </div>
  );
};

export default UserProfilePage;