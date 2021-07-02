const express = require("express");
const router = express.Router();

// @routes GET api/contacts
// @desc   Get User Contact
// @Access  Private
router.get("/", (req, res) => {
  res.send("Get Users Contact");
});
// @routes POST api/contacts
// @desc   Add Contact
// @Access  Private
router.post("/", (req, res) => {
  res.send("Add Contact");
});

// @routes PUT api/contacts/:id
// @desc   Update Contact
// @Access  Private
router.get("/:id", (req, res) => {
  res.send("Update Contact");
});
// @routes PUT api/contacts/:id
// @desc   Add Contact
// @Access  Private
router.get("/:id", (req, res) => {
  res.send("Update Contact");
});
// @routes DELETE api/contacts/:id
// @desc   Delete Contact
// @Access  Private
router.get("/:id", (req, res) => {
  res.send("Delete Contact");
});

module.exports = router;
