const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({ msg: "No token, access denied" });
    }

    // Split Bearer token
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    console.log("AUTH HEADER:", req.header("Authorization"));
    return res.status(401).json({ msg: "Invalid token" });
  }
};