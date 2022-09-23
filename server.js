const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
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

function deleteNote(id, notesList) {
  for(let i=0; 1<notesList.length; i++) {
    let note = notesList[i];
    
    if (note.id == id) {
    notesList.splice(i, 1);
    fs.writeFileSync(path.join(__dirname, './db/db.json'), 
    JSON.stringify(notesList, null, 2));
    break;
  };
};
};

app.delete('/notes/:id', (req, res) => {
  const notes = require('./db/db.json');
  const id = req.params.id;

  deleteNote(id, notes);
  res.json(true);
});

app.listen(PORT, () => {
  console.log(`App running at ${PORT}`)
});