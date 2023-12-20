// Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Button } from 'react-bootstrap';
//import Navbar from '../../components/navbar/navbar';
import { Home as HomeIcon, Workspaces, Quiz, SelfImprovement, ThumbUpAlt, SportsEsports, LocalLibrary, Settings, AddComment, ExitToApp } from '@mui/icons-material';
//import 'react-pro-sidebar/dist/css/styles.css'; // Adjust the path based on your actual file structure
import '../../styles/Home.css'; // Adjust the path based on your actual file structure


const Home = () => {
  const [theme, setTheme] = useState('light');
  const [position, setPosition] = useState('collapsed');
  const [userData, setUserData] = useState({ email: 'bipashagayary@gmail.com', fullname: 'Bipasha Gayary' });

  useEffect(() => {
    // Simulate fetching user data from a backend after login
    const fetchUserData = async () => {
      try {
        // Replace the URL with your actual backend endpoint for fetching user data
        const response = await fetch('https://your-backend-api/user-data', {
          method: 'GET',
          headers: {
            // Include any necessary headers (e.g., authentication token)
            'Authorization': 'Bearer YOUR_AUTH_TOKEN',
          },
        });

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Call the function to fetch user data
    fetchUserData();
  }, []);

  const toggleSidebar = () => {
    setPosition(position === 'collapsed' ? 'left' : 'collapsed');
  };

  const handleLogout = () => {
    // Implement your logout logic here
    // For example, clear user data, remove tokens, etc.

    // Redirect to the login page
    // Use the Link component from react-router-dom for navigation
    // <Link to="/Login">Login</Link> is not the correct way to navigate
  };

  return (
    <div className="home-container">
      {/* Sidebar */}
      <Sidebar theme={theme} position={position}>
        {/* App Name and Icon */}
        <div className="app-header">
          <h2>Unwind</h2>
          {/* Add your app icon here */}
        </div>

        {/* User Data */}
        {userData && (
          <div className="user-data">
            <p>{userData.fullname}</p>
            <p>{userData.email}</p>
          </div>
        )}
        <div className='Menu'>
          <Menu>
            <MenuItem icon={<HomeIcon />}>Home</MenuItem>
            <MenuItem icon={<Workspaces />}>Virtual Retreat</MenuItem>
            <MenuItem icon={<Quiz />}>Mental Health Quiz</MenuItem>
            <MenuItem icon={<SelfImprovement />}>Breathe</MenuItem>
            <MenuItem icon={<ThumbUpAlt />}>Daily Affirmation</MenuItem>
            <MenuItem icon={<SportsEsports />}>Games</MenuItem>
            <MenuItem icon={<LocalLibrary />}>Community</MenuItem>
            <div style={{ height: '20px' }}></div>
            <MenuItem icon={<Settings />}>Settings</MenuItem>
            <MenuItem icon={<AddComment />}>Feedback</MenuItem>
          </Menu>
        </div>
        <div style={{ height: '50px' }}></div>
        {/* Logout Button */}
        <Button variant="primary" style={{ backgroundColor: '#7071E8' }} type="submit" block className="mt-3" onClick={handleLogout}>
          Logout
        </Button>
      </Sidebar>

      {/* Main Content */}
      <div className="main-content">
        <h1>Welcome to Unwind</h1>
        <p>This is the main content.</p>
      </div>
    </div>
  );
};

export default Home;

