const express = require("express");
const router = express.Router();

const logoutController = require("../controllers/logout");
router.get("/auth/logout", logoutController);
