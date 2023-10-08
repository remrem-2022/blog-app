const express = require('express');
const router = express.Router();

router.get("/contact", async (req, res) => {

  res.render("contact");
});

exports = router;

  