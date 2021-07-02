const express = require("express");
const router = express.Router();

// @routes GET api/auth
// @desc   Get Logged In user
// Access  Private
router.get("/", (req, res) => {
  res.send("Get Loggedin User");
});

// @routes POST api/auth
// @desc   Loggin user a User
// Access  Public
router.post("/", (req, res) => {
  res.send("Login User");
});

module.exports = router;
