const express = require('express');
const fs = require('fs');
const { endianness } = require('os');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.get(express.urlencoded({extended: true}));

app.get ('/api/notes', (req, res) => {
    const notes = require('./db/db.json');
    res.json(notes);
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



app.listen(3001, () => {
  console.log('App running at http://localhost:3001/')
});