const User = require("../modules/userModule");
const jtw = require("jsonwebtoken");

// Get Methods For Get All Users From Database -----
exports.getAllUsers = async (req, res, next) => {
  try {
    const [user, _] = await User.findAll();
    res.status(200).json({ count: user.length, user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
// Get Methods For Get User By Id From Database -----

exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [user, _] = await User.findById(id);
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    const [user, _] = await User.findByEmail(email);
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Register New Account -------

exports.register = async (req, res, next) => {
  try {
    let { name, age, email, password, password2 } = req.body;
    let user = new User(name, age, email, password);
    user.password2 = password2;
    let message = await User.register(user);
    if (message.errors.length === 0) {
      res.status(201).json({ message: "Account was create" });
    } else {
      res.status(403).json({ message: message.errors });
    }
  } catch (error) {
    let reg = /'users.email_UNIQUE'/gi;
    if (reg.test(error.sqlMessage)) {
      res.status(400).json({ message: "Email already exists" });
    }
    next(error);
  }
};
// Login Nto Account -------
exports.login = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    const loginAccount = await User.login(email, password);
    if (loginAccount.validate) {
      const token = jtw.sign(
        { sub: loginAccount.id, name: loginAccount.name },
        loginAccount.salt,
        {
          expiresIn: 1,
        }
      );
      res.status(201).json({
        message: `Login method is working - Wellcome Back Mr.${loginAccount.name}`,
        token,
      });
    } else {
      res.status(401).json({ message: "Passeord Is Wrong" });
    }
  } catch (error) {
    res.status(400).json({ message: "Email or Password is wrong" });
    next(error);
  }
};
