const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Middleware to verify JWT with expiration check
function verifyToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. Token not provided." });
  }
  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET_KEY);

    // Check token expiration
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decoded.exp <= currentTimestamp) {
      return res.status(401).json({ message: "Token has expired." });
    }

    console.log("decoded token-->", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error?.message || "Invalid token." });
  }
}

module.exports = { verifyToken };
