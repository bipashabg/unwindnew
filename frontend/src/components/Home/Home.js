import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import ReactPlayer from 'react-player';
import { Workspaces, Quiz, SelfImprovement, Person, ThumbUpAlt, SportsEsports, LocalLibrary, AddComment } from '@mui/icons-material';
import '../../styles/Home.css';

function Home() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [Fullname, setFullname] = useState('');
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleMenuClick = (path) => {
    navigate(path);
  };

  useEffect(() => {
    axios.get('http://localhost:3001')
      .then(res => {
        if (res.status === 200) {
          if (res.data.Status === "Success") {
            setAuth(true);
            setFullname(res.data.Fullname);
          } else {
            setAuth(false);
            setMessage(res.data.Error);
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

  const handleDelete = () => {
    axios.get('http://localhost:3001')
      .then(res => {
        window.location.reload(true);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='home-page'>
      {auth ? (
        <div>
          <ReactPlayer
            url="/videos/video1.mp4"
            playing
            loop
            muted
            width="100%"
            height="100%"
            className="react-player"
          />
          <div className='content-overlay'>
            <h3>Welcome to Unwind! <br /><br /> {Fullname}</h3>
            <Sidebar>
              <Menu>
                <MenuItem icon={<Workspaces />}>Virtual Retreat</MenuItem>
                <MenuItem onClick={() => handleMenuClick("/Quiz")}>
                  <Quiz /> Mental Health Quiz
                </MenuItem>
                <MenuItem onClick={() => handleMenuClick("/breathe")}>
                  <SelfImprovement /> Breathe
                </MenuItem>
                <MenuItem icon={<ThumbUpAlt />}>Daily Affirmation</MenuItem>
                <MenuItem onClick={() => handleMenuClick("/gamepage")}>
                  <SportsEsports /> Games
                </MenuItem>
                <MenuItem icon={<LocalLibrary />}>Community</MenuItem>
                <div style={{ height: '20px' }}></div>
                <MenuItem onClick={() => handleMenuClick("/userprofile")}>
                  <Person /> User Profile
                </MenuItem>
                <MenuItem icon={<AddComment />}>Feedback</MenuItem>
              </Menu>
            </Sidebar>
            <br />
            <button className='btn btn-danger' onClick={handleDelete}>Logout</button>
          </div>
        </div>
      ) : (
        <div>
          <ReactPlayer
            url="/videos/video1.mp4"
            playing
            loop
            muted
            width="100%"
            height="100%"
            className="react-player"
          />
          <div className='content-overlay'>
            <h3>{message}</h3>
            <h3>Login Now</h3>
            <Link to="/Login" className='btn btn-primary'>Login</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
