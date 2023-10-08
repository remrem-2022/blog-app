const express = require('express');
const router = express.Router();

const redirectIfAuthenticatedMiddleware = require('../middleware/redirectIfAuthenticatedMiddleware');

const loginController = require("../controllers/login");
const loginUserController = require("../controllers/loginUser");

router.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
router.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)

exports = router;