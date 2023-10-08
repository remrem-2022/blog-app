const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

module.exports = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Handle validation errors here
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).exec();

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        req.session.userId = user._id;
        return res.redirect("/");
      }
    }

    // To prevent user enumeration attacks, give a generic response for login failure
    return res.redirect("/auth/login?error=Invalid%20credentials");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};
