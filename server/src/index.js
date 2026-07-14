const express = require("express");
const app = express();
const connectDB = require("./db");
const authRouter = require("./routers/auth");
const PORT = 5001;

connectDB();

app.use(express.json());
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
