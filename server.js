const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.get(express.urlencoded({extended: true}));

app.get('/notes', (req, res) => {
    const notes = require('./db/db.json');
    res.json(notes);
});

app.post('/notes', (req, res) => {
  let notes = require('./db/db.json');
  let newNote = req.body;
  // let noteList = JSON.parse(fs.readFile('./db/db.json'));
  let noteLength = (notes.length).toString();
  newNote.id = noteLength;


  notes.push(newNote)
 
 fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2), (err) => {
  if (err) {
    res.status(500).end()
  } else {
    res.status(200).json({ 
      message: 'Everything is fine!'
    });
  };
 });
});

app.listen(3001, () => {
  console.log('App running at http://localhost:3001/')
});