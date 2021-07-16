const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator/");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middlewares/auth");
const cors = require("cors");

// @routes GET api/auth
// @desc   Get Logged In user
// Access  Private
router.get("/", auth, async (req, res) => {
  try {
    console.log(req.user);
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "An Error Occured in the Server" });
  }
});

// @routes POST api/auth
// @desc   Loggin user a User
// Access  Public
router.post(
  "/",
  body("email", "Email is required").not().isEmpty(),
  body("email", "Please enter a valid email").isEmail(),
  body("password", "password is required").not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      const payload = {
        id: user.id,
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 86500000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log("Error", err.message);
      res.status(500).send("Sorry an Error occured in the Server");
    }
  }
);

module.exports = router;
