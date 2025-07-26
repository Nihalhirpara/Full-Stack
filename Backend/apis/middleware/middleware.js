const jwt = require("jsonwebtoken");

const protectedRoute = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Expect: Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "Access denied. Token missing." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "mysecretkey");
    req.user = decoded; // Attach decoded payload to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = protectedRoute;
