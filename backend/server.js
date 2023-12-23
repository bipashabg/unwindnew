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
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["POST", "GET"],
  credentials: true
}));
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
//middleware
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  console.log('Received token:', token);

  if (!token) {
    return res.json({ Error: "You are not authenticated" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        console.error('Token verification error:', err);
        return res.json({ Error: "Token is not valid" });
      } else {
        console.log('Token decoded successfully:', decoded);
        req.Fullname = decoded.Fullname;
        next();
      }
    });
  }
};

// userprofileVerify.js

const userprofileVerify = (req, res, next) => {
  const token = req.cookies.token;
  console.log('Received token:', token);

  if (!token) {
    return res.json({ Error: "You are not authenticated" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        console.error('Token verification error:', err);
        return res.json({ Error: "Token is not valid" });
      } else {
        console.log('Token decoded successfully:', decoded);
        req.Fullname = decoded.Fullname;
        req.username = decoded.username;
        next();
      }
    });
  }
};

module.exports = userprofileVerify;


//verifyrequest
app.get('/', verifyUser, (req, res) => {
  return res.json({Status: "Success", Fullname: req.Fullname});
})

// For routes that need both Fullname and username (e.g., user profile)
app.get('/userprofile', userprofileVerify, (req, res) => {
  return res.json({ Status: "Success", Fullname: req.Fullname, username: req.username });
});


//Login endpoint

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Received a login request');
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, data) => {
    if (err) {
      console.error('Login error in server:', err);
      return res.status(500).json({ Error: "Login error in server" });
    }

    if (data.length > 0) {
      bcrypt.compare(password.toString(), data[0].hashedPassword, (err, response) => {
        if (err) {
          console.error('Password compare error:', err);
          return res.status(500).json({ Error: "Password compare error" });
        }
        if(response) {
          const Fullname = data[0].Fullname;
          const token = jwt.sign({Fullname}, "jwt-secret-key", {expiresIn: '1d'});
          res.cookie('token', token);
          return res.json({Status: "Success"});
        } else {
          return res.json({Error: "Password not matched"});
        }
      })
    } else {
        return res.json({Error: "Email doesn't exist"});
    }
  })
})

app.get('/', (req, res) => {
  res.clearCookie('token');
  return res.json({Status: "Success"});
})

app.listen(3001, () => {
  console.log(`Server is running on port ${3001}`);
});
