const Note = require("../modules/noteModule");
const jtw = require("jsonwebtoken");
const User = require("../modules/userModule");
exports.getNotes = async (req, res, next) => {
  try {
    const [note, _] = await Note.findAll();
    res.status(200).json({ count: note.length, note });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.getNotesByCreatedID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = jtw.decode(req.headers.authorization);
    if (!req.headers.authorization || !token) {
      res.status(401).send("You No Have Permissions");
    } else {
      const [user] = await User.findById(token.sub);
      if (!user.length == 1) {
        res.status(401).send("You No Have Permissions");
      } else {
       jtw.verify(req.headers.authorization, user[0].salt)
        const [note, _] = await Note.FindNotesByCreatedID(id);
        res.status(200).json({ count: note.length, note });
      }
    }
  } catch (error) {
    console.log(error);
    res.send({error})
    next(error);
  }
};
exports.getNoteByNoteID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = jtw.decode(req.headers.authorization);
    if (!req.headers.authorization || !token) {
      res.status(401).send("You No Have Permissions");
    } else {
      const [user] = await User.findById(token.sub);
      if (!user.length == 1) {
        res.status(401).send("You No Have Permissions");
      } else {
       jtw.verify(req.headers.authorization, user[0].salt)
        const [note, _] = await Note.FindNoteByNoteID(id);
        res.status(200).json({ note });
      }
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.addNote = async (req, res, next) => {
  try {
    let { title, content, style, created_at, created_id } = req.body;
    const date = new Date();
    let note = new Note(title, content, style, created_at, created_id);
    note.created_at = `${date.getFullYear()}-${date.getDay()}-${date.getMonth()}`;
    const { note: reNote, errors } = await Note.addNote(note);
    if (!(errors.length === 0)) {
      res.status(401).json({ message: errors });
    } else {
      res.status(201).json({ message: reNote });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
