const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3001;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:');
    return;
  }
  console.log('Connected');
});

app.use(bodyParser.json());

app.post('/question', (req, res) => {
  const { question } = req.body;
  const sql = 'INSERT INTO question (question, status) VALUES (?, ?)';
  db.query(sql, [question, 'pending'], (err, result) => {
    if (err) {
      console.error('Error');
      return;
    }
  });
});

app.put('/question/:id', (req, res) => {
  const { id } = req.params;
  const { question, status } = req.body;
  let sql;

  if (question) {
    sql = 'UPDATE question SET question = ? WHERE id = ?';
    db.query(sql, [question, id], (err, result) => {
      if (err) {
        console.error('Error');
        return;
      }
    });
  } else if (status) {
    sql = 'UPDATE question SET status = ? WHERE id = ?';
    db.query(sql, [status, id], (err, result) => {
      if (err) {
        console.error('Error',);
        return;
      }
      res.send('Status updated successfully!');
    });
  } else {
    res.status(400).send('Bad Request');
  }
});

app.get('/question', (req, res) => {
  const sql = 'SELECT * FROM question';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error');
      return;
    }
    res.json(results);
  });
});

app.get('/question', (req, res) => {
  const sql = 'SELECT * FROM question WHERE status = ?';
  db.query(sql, ['approved'], (err, results) => {
    if (err) {
      console.error('Error');
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log('running');
});