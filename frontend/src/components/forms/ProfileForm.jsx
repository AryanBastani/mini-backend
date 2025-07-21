import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import '../../styles/ProfileForm.css';

const ProfileForm = ({ initialData, onSubmit, message, error }) => {
  const [firstName, setFirstName] = useState(initialData?.firstName || '');
  const [lastName, setLastName] = useState(initialData?.lastName || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [gender, setGender] = useState(initialData?.gender || '');

  useEffect(() => {
    setFirstName(initialData?.firstName || '');
    setLastName(initialData?.lastName || '');
    setEmail(initialData?.email || '');
    setGender(initialData?.gender || '');
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ firstName, lastName, email, gender });
  };

  return (
    <div className="profile-wrapper d-flex justify-content-center align-items-center">
      <Card className="profile-card shadow">
        <Card.Body>
          <h3 className="text-center mb-4">Update Profile</h3>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Gender</Form.Label>
              <Form.Select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Form.Select>
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfileForm;
