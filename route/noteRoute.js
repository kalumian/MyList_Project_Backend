var express = require("express");
var router = express.Router();
var controller = require("../controller/noteController");

// Get
router.get("/notes", controller.getNotes);
router.get("/notes/created_by/:id", controller.getNotesByCreatedID);
router.get("/note/id/:id", controller.getNoteByNoteID);

//  Post
router.post("/note/add", controller.addNote);

module.exports = router;
