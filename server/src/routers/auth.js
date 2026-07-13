const express = require("express");
const router = express.Router();

router.post("/signup", async (req, res) => {
  res.json({ message: "signup endpoint" });
});

module.exports = router;
