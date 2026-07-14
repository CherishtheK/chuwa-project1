const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const User = require("../models/User");
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

module.exports = router;
