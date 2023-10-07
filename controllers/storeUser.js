const User = require("../models/User.js");
const path = require("path");
module.exports = async (req, res) => {
  try {
    const user = await User.create(req.body);
    console.log(user);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
    res.redirect("/auth/register");
  }
};
