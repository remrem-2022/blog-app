const User = require('../models/User')

module.exports = async (req, res, next) => {
    try {
      const user = await User.findById(req.session.userId);
      if (!user) {

        return res.status(404).json({ error: 'User not found' });
      }
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
