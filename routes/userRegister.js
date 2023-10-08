const express = require('express');
const router = express.Router();

const storeUserController = require("../controllers/storeUser");

const redirectIfAuthenticatedMiddleware = require('../middleware/redirectIfAuthenticatedMiddleware');

router.get("/auth/register", (req, res) => {
    res.render("register");
  });
  
router.post("/users/register", redirectIfAuthenticatedMiddleware, storeUserController);

exports = router;