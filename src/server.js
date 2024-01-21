const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 5000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'questiondb',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

app.use(bodyParser.json());

app.post('/api/questions', (req, res) => {
  const { question } = req.body;
  const sql = 'INSERT INTO questions (text, approved) VALUES (?, ?)';
  db.query(sql, [question, false], (err, result) => {
    if (err) {
      console.error('Error inserting question:', err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.send('Question submitted for approval');
  });
});

app.get('/api/approved-questions', (req, res) => {
  const sql = 'SELECT * FROM questions WHERE approved = ?';
  db.query(sql, [true], (err, results) => {
    if (err) {
      console.error('Error retrieving approved questions:', err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
});