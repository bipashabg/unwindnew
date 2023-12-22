import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Home as HomeIcon } from '@mui/icons-material';
import '../../styles/Home.css';

function Home() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [Fullname, setFullname] = useState('');
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

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
          // Handle other status codes, not just 404
          setAuth(false);
          setMessage('An error occurred. Please try again.');
        }
      })
      .catch(err => {
        // Handle network errors or other issues
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
    <div className='container mt-4'>
      {
        auth ?
          <div>
            <h3>You are Authorized --- {Fullname}</h3>
            
            <button className='btn btn-danger' onClick={handleDelete}>Logout</button>
          </div>
          :
          <div>
            <h3>{message}</h3>
            <h3>Login Now</h3>
            <Link to="/Login" className='btn btn-primary'>Login</Link>
          </div>
      }
    </div>
  );
}

export default Home;
