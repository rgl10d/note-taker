const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 8080;

const dbFile = "./db/db.json";

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Middleware for statuc file connection (The CSS)
app.use(express.static(path.join(__dirname, 'public')));

// VIEW ROUTES
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});
// "*" will default to home/root if there is no matching route found
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// API ROUTES
app.get("/api/notes", (req, res) => {
    // Should read the `db.json` file and return all saved notes as JSON.
    fs.readFile(dbFile, (err, data) => {
        if (err) throw err;
        const savedNotes = JSON.parse(data);
        return res.json(savedNotes);
      });
});

app.post("/api/notes", (req, res) => {
    // Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

})

app.delete("/api/notes/:id", (req, res) => {
    // Should receive a query parameter containing the id of a note to delete.
    // This means you'll need to find a way to give each note a unique id when it's saved. 
    // In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});