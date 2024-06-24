const authService = require("../services/Auth.service.js");
const express = require("express");
const router = express.Router();

// Example route
router.post("/login", login);

function login(req, res, next) {
  authService
    .login(req.body)
    .then((userData) => res.json({ message: "Login Successful", ...userData }))
    .catch(next);
}

module.exports = router;
