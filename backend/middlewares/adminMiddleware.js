const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid Token" });
  }
};

const verifyAdmin = (req, res, next) => {
  verifyUser(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }
    next();
  });
};

module.exports = { verifyUser, verifyAdmin };