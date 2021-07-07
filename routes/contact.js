const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator/");
const User = require("../models/User");
const Contact = require("../models/Contact");
const auth = require("../middlewares/auth");

// @routes GET api/contacts
// @desc   Get User Contact
// @Access  Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ msg: "Sorry There was an error fetching your Contacts" });
  }
});

// @routes POST api/contacts
// @desc   Add Contact
// @Access  Private
router.post(
  "/",
  [
    auth,
    body("name", "Name is required").not().isEmpty(),
    body("email", "Email is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();
      console.log("COntacts Added SucessFully");
      res.status(200).json(contact);
    } catch (err) {
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

// @routes PUT api/contacts/:id
// @desc   Add Contact
// @Access  Private
router.put("/:id", auth, async (req, res) => {
  // Get the values from the request Body
  const { name, email, phone, type } = req.body;

  // build a contact object

  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(500).json({ msg: "Contact Not Found" });
    if (contact.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "Unauthorised: You can only Update your own contacts" });
    }
    contact = await Contact.findByIdAndUpdate(req.params.id, contactFields, {
      new: true,
    });
    res.json(contact);
    // Endure User OWns the Contact for Update
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @routes DELETE api/contacts/:id
// @desc   Delete Contact
// @Access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(500).json({ msg: "Contact Not Found" });
    if (contact.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "Unauthorised: You can only delete your own contacts" });
    }
    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: "Contact Removed" });
    // Endure User Owns the Contact for Update
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
