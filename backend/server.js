const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');
const cors = require('cors');  // Import cors

const app = express();
const port = 3000; // Change the port to a different one, e.g., 3000

app.use(cors());  // Enable CORS

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '3306',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Cindley23',
  database: process.env.DB_NAME || 'unwind',
  connectTimeout: 20000, // 20 seconds (adjust as needed)
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Signup endpoint
app.post('/api/Signup', async (req, res) => {
  try {
    const { username, Fullname, email, password } = req.body;

    // Validate the data
    if (!isValidEmail(email) || !isValidPassword(password) || !isValidUsername(username) || !isValidName(Fullname)) {
      return res.status(400).send('Invalid data format');
    }

    // Check if the username or email is already taken
    const userExists = await userExists(username, email);
    if (userExists) {
      return res.status(409).send('Username or email is already taken');
    }

    // Hash and salt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store the user data in the database
    db.query(
      'INSERT INTO users (username, Fullname, email, password) VALUES (?, ?, ?, ?)',
      [username, Fullname, email, hashedPassword],
      (err, result) => {
        if (err) {
          console.error('Error creating user:', err);
          res.status(500).send('Internal Server Error');
        } else {
          res.status(201).send('User created successfully');
          alert('User successfully created');
        }
      }
    );
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'C:\Users\User\..\frontend\src\components\Signup\Signup.js')); // Update the path accordingly
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Add your validation functions here (isValidEmail, isValidPassword, isValidUsername, isValidName)
// ...

// Add your checkUserExists function here
// ...
