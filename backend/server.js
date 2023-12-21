const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const salt = 10;

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '3306',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Cindley23',
  database: process.env.DB_NAME || 'unwind',
  connectTimeout: 20000,
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Signup endpoint
app.post('/signup', (req, res) => {
  const sql = "INSERT INTO users (username, Fullname, email, hashedPassword) VALUES (?)";
  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) return res.json({ Error: "Error for hashing password" });

    const values = [
      req.body.username,
      req.body.Fullname,
      req.body.email,
      hash
    ];

    db.query(sql, [values], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.json({ Error: "Inserting data error in server" });
      }
      console.log('Data inserted successfully');
      return res.json({ Status: "Values entered successfully" });
    });
  });
});

app.listen(3001, () => {
  console.log(`Server is running on port ${3001}`);
});
