const bcrypt = require('bcrypt')
const User = require("../models/User.js");


module.exports = async (req, res) => {
    try {
      const { username, password } = req.body;
      
      const user = await User.findOne({ username: username });
  
      if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
  
        if (isPasswordValid) {
          res.redirect('/');
        } else {
          res.redirect('/auth/login');
        }
      } else {
        res.redirect('/auth/login');
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).send('Internal Server Error');
    }
  };