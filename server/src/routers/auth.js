const express = require("express");
const { requireJwt } = require("../middlewares/auth");
const {
  signupUser,
  signinUser,
  getCurrentUser,
  signoutUser,
  forgotPassword,
} = require("../controller/auth.js");
// const CustomAPIError = require("../errors");
const router = express.Router();

router.post("/signup", signupUser);

router.post("/signin", signinUser);

router.get("/me", requireJwt, getCurrentUser);

router.post("/signout", signoutUser);

router.post("/forgot-password", forgotPassword);
module.exports = router;
