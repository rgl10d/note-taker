// REQUIREMENTS
const fs = require("fs");
const express = require("express");
const path = require("path");
// EXPRESS INSTANCE CREATION
const app = express();
// PORT DECLARATION
const PORT = process.env.PORT || 8080;
// NOTES DATABASE FILE PATH
const dbFile = "./db/db.json";

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// MIDDLEWARE for static file connection (The CSS in this case)
app.use(express.static(path.join(__dirname, 'public')));

// RANDOM ID FUNCTION
function guidGenerator() {
    let S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
};

// VIEW ROUTES
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// API ROUTES
// GET NOTES
app.get("/api/notes", (req, res) => {
    fs.readFile(dbFile, (err, data) => {
        if (err) throw err;
        return res.json(JSON.parse(data));
      });
});
// POST NEW NOTE
app.post('/api/notes', (req, res) => {
    const newNotes = JSON.parse(fs.readFileSync(dbFile));
    req.body.id = guidGenerator();
    newNotes.push(req.body);
    fs.writeFileSync(dbFile, JSON.stringify(newNotes));
    return res.json(newNotes);
});
// DELETE A NOTE
app.delete("/api/notes/:id", (req, res) => {
    const savedNotes = JSON.parse(fs.readFileSync(dbFile));
    savedNotes.splice(savedNotes.findIndex(function(i){
        return i.id === req.params.id;
    }), 1);
    fs.writeFileSync(dbFile, JSON.stringify(savedNotes));
    return res.json(savedNotes);
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});