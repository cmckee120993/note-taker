const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.get(express.urlencoded({extended: true}));

app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    };
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

app.post('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', (err, data) => {
    if (err) {
      console.log(err);
    }
    const notes = JSON.parse(data);
    const { noteTitle, noteText} = req.body;
    notes.push({noteTitle, noteText});

    fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2), (err) =>{
      if (err) {
        res.status(500).end();
      } else {
        res.status(200).json({
          message: "Success!"
        })
      }
      });
})
});

app.delete('/api/notes/:id', (req, res) => {
  let noteList = JSON.parse(fs.readFileSync("./db/db.json"));
  let noteID = (req.params.id).toString();

  noteList = noteList.filter(selected => {
    return selected.id != noteID;
  });

  fs.writeFileSync('./db/db.json', JSON.stringify(noteList));
  res.json(noteList);
});

app.listen(3001, () => {
  console.log('App running at http://localhost:3001/')
});