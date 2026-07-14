const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function requireJwt(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.sub).select("-password");
    if (!user) {
      return res.status(401).json({ message: "The user does not exist" });
    }
    req.user = user;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid token!" });
  }
}
function requireVendorRole(req, res, next) {
  if (req.user?.role !== "vendor")
    return res.status(403).json({ message: "forbidden" });
  next();
}

module.exports = {
  requireJwt,
  requireVendorRole,
};
