const shortid = require("shortid");
const db = require("../database/db");
const { hashPassword } = require("../healper");
class User {
  constructor(name, age, email, password, salt) {
    this.email = email;
    this.age = age;
    this.name = name;
    this.salt = !salt ? shortid.generate() : salt;
    this.password = hashPassword(password, this.salt);
  }

  // Methods For connection With Database

  // Register
  static async register({ name, age, email, password, password2, salt }) {
    let errors = [];
    if (password !== hashPassword(password2, salt)) {
      errors.push("Password does not match");
    }
    if (password.length < 4) {
      errors.push("Password must be more than 4 characters");
    }
    if (!Boolean(name)) {
      errors.push("Please write the name correctly");
    }

    if (!(age > 0) || !Boolean(age)) {
      errors.push("Please write the age correctly");
    }

    if (errors.length == 0) {
      const order = `
      INSERT INTO users(name, age, email, password , salt) values
         ("${name}",
         "${age}",
         "${email}",
         "${password}",
         "${salt}"
         )
      `;
      let [user, _] = await db.execute(order);
      return { user, errors };
    } else {
      return { errors, user: false };
    }
  }

  // Login
  static async login(email, password) {
    let { user } = await this.findByEmail(email);
    return hashPassword(password, user.salt) === user.password
      ? { name: user.name, validate: true, salt: user.salt, id: user.id }
      : { name: undefined, validate: false, salt: undefined, id: undefined };
  }

  // Get Method For Fet All Users
  static findAll() {
    const order = "SELECT * FROM users";
    return db.execute(order);
  }

  // Get Method For Fet User By Id
  static findById(id) {
    const order = `SELECT * FROM users WHERE id = ${id}`;
    return db.execute(order);
  }

  // Get Method For Fet User By Email
  static async findByEmail(email) {
    const order = `SELECT * FROM users WHERE email = "${email}"`;
    const [[user], _] = await db.execute(order);
    return { user };
  }
}
module.exports = User;
