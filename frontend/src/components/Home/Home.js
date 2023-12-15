// HomePage.js
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Login from '../Login/Login';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          
            <h1>Welcome to Our Website</h1>
            <p>
              Hello
            </p>
            <p>
              <Button variant="primary">Feature</Button>
            </p>
            <br />
          
        </Col>
      </Row>
      <Button variant="primary" style={{ backgroundColor: '#7071E8' }} type="submit" block>
            <Link to="/Login">Login</Link>
      </Button>
    </Container>
    
  );
};

export default Home;
