// const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const adminMiddleWare = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "token mavjud emas" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "user not found" });

    if (user.role !== "admin")
      return res.status(403).json({ message: "you aren't admn" });

    next();
  } catch (error) {
    res.status(500).json({ message: "server hatosi", error: error.message });
  }
};

module.exports = adminMiddleWare;
