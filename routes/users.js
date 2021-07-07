const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator/");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
// @routes POST api/users
// @desc   Register a User
// Access  Public
router.post(
  "/",
  body("name", "Name is required").not().isEmpty(),
  body("email", "Email is required").not().isEmpty(),
  body("email", "Please Enter a Valid email").isEmail(),
  body("password", "Password is required").not().isEmpty(),
  body("password", "Please password must be 6 or more characters").isLength({
    min: 6,
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    // }
    // );

    try {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ msg: "User Already Exists" });

      //  Create a new user instance
      user = new User({
        name,
        email,
        password,
      });

      console.log(user);
      // Save User
      await user.save();
      console.log("User Successfully Created");
      // res.send("User Created");
      //  Encrypt Password with JWT
      const payload = {
        id: user.id,
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log("Error", error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
