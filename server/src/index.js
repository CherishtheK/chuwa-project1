const express = require("express");
const app = express();
const connectDB = require("./db");
const PORT = 5001;

connectDB();

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
