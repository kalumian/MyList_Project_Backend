const crypto = require("crypto");

exports.hashPassword = (password, salt = "secret-kalumian") => {
  return crypto.createHmac("sha256", salt).update(password).digest("hex");
};

