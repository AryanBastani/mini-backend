import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileForm from '../components/forms/ProfileForm';
import { Spinner } from 'react-bootstrap';
import '../styles/UserProfilePage.css'

const UserProfilePage = ({ userId }) => {
  const [profileData, setProfileData] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); 

  const handleProfileSubmit = async (formData) => {
    setMessage('');
    setError('');

    if (
      !formData.firstName?.trim() ||
      !formData.lastName?.trim() ||
      !formData.email?.trim() ||
      !formData.gender?.trim()
    ) {
      setError('All fields are required.');
      return;
    }

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
        navigate('/course');
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
      {loading && (
        <div className="text-center mb-3">
          <Spinner animation="border" size="sm" /> Loading...
        </div>
      )}
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
