import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../styles/userprofile.css';
import axios from 'axios';

const UserProfile = () => {
  const [Fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:3001/userprofile')
      .then(res => {
        if (res.status === 200) {
          const data = res.data; // Assuming the response is an object
          if (data.Status === "Success") {
            setAuth(true);
            setFullname(data.Fullname || ''); // Access nested properties
            setUsername(data.username || '');
          } else {
            setAuth(false);
            setMessage(data.Error || 'An error occurred. Please try again.');
          }
        } else {
          setAuth(false);
          setMessage('An error occurred. Please try again.');
        }
      })
      .catch(err => {
        console.log(err);
        setAuth(false);
        setMessage('An error occurred. Please try again.');
      });
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        <Col md={3}>
          <Card>
          <Card.Img variant="top" src="path-to-profile-image" />
            <Card.Body>
              <Card.Title>{Fullname}</Card.Title>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img variant="top" />
            <Card.Body>
              <Card.Title>{username}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={9}>
          {!auth && (
            <Card>
              <Card.Body>
                <Card.Title>{message}</Card.Title>
                <Link to="/login">
                  <Button variant="primary">Login</Button>
                </Link>
              </Card.Body>
            </Card>
          )}
          {auth && (
            <>
              <Card>
                <Card.Body>
                  <Card.Title>About Me:</Card.Title>
                  <Card.Text>{'Hi'}</Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>Mood History:</Card.Title>
                  {/* Add Mood Tracking details here */}
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>View Mental Health Quiz data:</Card.Title>
                  {/* Add Mental Health Quiz details here */}
                </Card.Body>
              </Card>
              {/* Add more Card components for additional sections */}
              <Card>
                <Card.Body>
                  <Card.Title>Last online:</Card.Title>
                  {/* Add Mental Health Quiz details here */}
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>Date of Joining:</Card.Title>
                  {/* Add Mental Health Quiz details here */}
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>Number of community posts:</Card.Title>
                  {/* Add Mental Health Quiz details here */}
                </Card.Body>
              </Card>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
