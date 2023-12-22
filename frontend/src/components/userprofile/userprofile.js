import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Card, ListGroup } from 'react-bootstrap';
import '../../styles/userprofile.css';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    username: 'bipashagayary',
    fullname: 'Bipasha Gayary',
    profilePicture: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fdefault-profile-picture&psig=AOvVaw1RPH6oYqiaThQiyZXj4xFB&ust=1703358631194000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCPDdtcPfo4MDFQAAAAAdAAAAABAE', // Placeholder image
  });

  useEffect(() => {
    // Fetch user data from the backend/API and update the state
    // Example: fetchUserData().then(data => setUserData(data));
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        <Col md={3}>
          <Card>
            <Card.Img variant="top" src={userData.profilePicture} />
            <Card.Body>
              <Card.Title>{userData.fullname}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={9}>
          <Card>
            <Card.Body>
              <Card.Title>Bio</Card.Title>
              <Card.Text>{`Username: ${userData.username}`}</Card.Text>
              {/* Add more bio details here */}
            </Card.Body>
          </Card>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Mood History</Card.Title>
              {/* Add Mood Tracking details here */}
            </Card.Body>
          </Card>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>View Mental Health Quiz data</Card.Title>
              {/* Add Language Preference details here */}
            </Card.Body>
          </Card>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Language Preference</Card.Title>
              {/* Add Language Preference details here */}
            </Card.Body>
          </Card>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Recent Posts</Card.Title>
              {/* Add Recent Posts details here */}
            </Card.Body>
          </Card>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Journal Entries</Card.Title>
              {/* Add Journal Entries details here */}
            </Card.Body>
          </Card>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Friend List</Card.Title>
              {/* Add Friend List details here */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
