const express = require('express');
const router = express.Router();

const storeUserController = require("../controllers/storeUser");
const newUserController = require("../controllers/newUser");

const redirectIfAuthenticatedMiddleware = require('../middleware/redirectIfAuthenticatedMiddleware');

router.get("/auth/register", redirectIfAuthenticatedMiddleware, newUserController);
router.post("/users/register", redirectIfAuthenticatedMiddleware, storeUserController);

module.exports = router;

