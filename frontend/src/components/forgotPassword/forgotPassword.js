// ForgotPassword.js

import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Implement your password reset logic here
    // For example, you can send a reset link to the user's email
    setShowAlert(true);
  };

  return (
    <div className="forgot-password-page">
      <Container className="glass-container">
        <Row className="justify-content-md-center mt-5">
          <Col md={6}>
            <h2 className="text-center mb-4">Forgot Password</h2>
            {showAlert && (
              <Alert variant="info" onClose={() => setShowAlert(false)} dismissible>
                Password reset instructions sent to your email.
              </Alert>
            )}
            <Form onSubmit={handleForgotPassword}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" block>
                Reset Password
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ForgotPassword;
