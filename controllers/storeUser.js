const User = require("../models/User.js");
const path = require("path");

module.exports = async (req, res) => {
  try {
    const user = await User.create(req.body);
    console.log("User registered:", user.username);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    // Handle the error appropriately (e.g., show an error message to the user)
    res.status(500).send("Internal Server Error");
  }
};
