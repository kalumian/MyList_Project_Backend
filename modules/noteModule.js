const db = require("../database/db");
const User = require("./userModule");

class Note {
  constructor(title, content, created_at, style, created_id) {
    this.title = title;
    this.content = content;
    this.state = "available";
    this.deleted_at = "_";
    this.style = style;
    this.created_at = created_at;
    this.created_id = created_id;
  }
  // Get Method For Fet All Users
  static findAll() {
    const order = "SELECT * FROM notes";
    return db.execute(order);
  }

  // Get Method For Fet User By Id or Created_id

  static FindNoteByNoteID(id) {
    const order = `SELECT * FROM notes WHERE id = ${id}`;
    return db.execute(order);
  }
  static FindNotesByCreatedID(created_id) {
    const order = `SELECT * FROM notes WHERE created_id = ${created_id}`;
    return db.execute(order);
  }

  // Create A New Note
  static async addNote({
    title,
    content,
    created_at,
    style,
    state,
    deleted_at,
    created_id,
  }) {
    let errors = [];
    let [[is_created_id], _] = await User.findById(created_id);
    if (!Boolean(title)) {
      errors.push("Please write the title correctly");
    }
    if (!content) {
      errors.push("Please write the content correctly");
    }
    if (!is_created_id) {
      errors.push("The creator is undefined");
    }
    if (errors.length == 0) {
      const order = `
      INSERT INTO notes(title, content, created_at, style, state, deleted_at, created_id) values
         ("${title}",
         "${content}",
         "${created_at}",
         "${style}",
         "${state}",
         "${deleted_at}",
         "${created_id}"
         )
      `;
      let [note, _] = await db.execute(order);
      return { note, errors };
    } else {
      return { errors, note: false };
    }
  }
}

module.exports = Note;
