const express = require("express");
const router = express.Router();

// @routes POST api/users
// @desc   Register a User
// Access  Public
router.post("/", (req, res) => {
  res.send("Register a User");
});

module.exports = router;
