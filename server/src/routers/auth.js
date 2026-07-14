const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const User = require("../models/User");
const { requireJwt } = require("../middlewares/auth");
// const CustomAPIError = require("../errors");
const router = express.Router();

router.post("/signup", async (req, res, next) => {
  try {
    const { email, password, isVendor } = req.body;
    //validate email and password
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email!" });
    }

    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters!" });
    }
    //check whether the user is alreay signed up
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "The email has been registered!" });
    }

    //hash password
    const hashed = await bcrypt.hash(password, 10);

    //store db
    user = await User.create({
      email,
      password: hashed,
      role: isVendor ? "vendor" : "regular",
    });
    //create token
    const payload = {
      sub: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({
      token,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
});

router.post("/signin", async (req, res, next) => {
  try {
    const { email, password, isVendor } = req.body;

    //check whether the user is alreay signed up
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Wrong email or password!" });
    }

    //compare password
    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(401).json({ message: "Wrong email or password!" });
    }
    //validate role
    const checkedRole = isVendor ? "vendor" : "regular";
    if (checkedRole !== user.role) {
      return res.status(403).json({ message: "Wrong role" });
    }
    const payload = {
      sub: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({
      token,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
});

router.get("/me", requireJwt, (req, res) => {
  res.json({
    user: { id: req.user._id, email: req.user.email, role: req.user.role },
  });
});

router.post("/signout", (req, res) => {
  res.json({ message: "Signed out!" });
});

router.post("/forgot-password", (req, res) => {
  const { email } = req.body;
  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email!" });
  }
  return res.json({
    message: "We have sent an email with the link to update your password!",
  });
});
module.exports = router;
