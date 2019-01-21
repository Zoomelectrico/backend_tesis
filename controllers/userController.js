const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const User = mongoose.model("User");

exports.getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const [user] = await User.find({ email });
    res.json({ user, success: true });
  } catch (err) {
    res.json({ success: false, err });
  }
};

exports.validateUser = async (req, res, next) => {
  const { dni } = req.body;
  if (/\./g.test(dni)) {
    req.body.dni = dni.replace(/\./g, "");
  }
  next();
};

exports.createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, dni, carnet, email, password } = req.body;
    const user = new User({
      firstName,
      lastName,
      dni,
      carnet,
      email,
      password
    });
    await user.save();
    next();
  } catch (err) {
    res.json({ success: false, err });
  }
};
