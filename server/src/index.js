const express = require("express");
const app = express();
const connectDB = require("./db");
const authRouter = require("./routers/auth");
const productRouter = require("./routers/products");
const cartRouter = require("./routers/cart");
const PORT = 5001;
const cors = require("cors");

connectDB();

app.use(express.json());
app.use(cors());

app.get("/api/health", (req, res) => {
  res.json({ message: "ok" });
});
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
