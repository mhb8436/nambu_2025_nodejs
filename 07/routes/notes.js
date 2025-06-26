const express = require("express");
const router = express.Router();
const noteController = require("../controllers/notes");

router.post("/notes", noteController.createNote);
router.get("/notes", noteController.getAllNotes);
router.get("/notes/:tag", noteController.getNotes);
router.put("/notes/:id", noteController.updateNote);
router.delete("/notes/:id", noteController.deleteNote);

module.exports = router;
