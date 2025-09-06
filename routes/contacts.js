const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { getDb } = require("../db/connect");

// GET all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await getDb().collection("contacts").find().toArray();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one contact by ID
router.get("/:id", async (req, res) => {
  try {
    const contact = await getDb()
      .collection("contacts")
      .findOne({ _id: new ObjectId(req.params.id) });
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
