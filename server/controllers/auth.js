const User = require("../models/user.model");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");

router.use(cookie());

const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).json({ message: "This email already taken." });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET
    );

    res.cookie("token", token);

    res.status(200).json({ user });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error while signing up.", error: error.message });
  }
};

// const login = async (req, res) => {

//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user)
//       return res
//         .status(404)
//         .json({ message: "Register first. Your email is incorrect." });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(400).json({ message: "Password is not correct." });

//     const token = jwt.sign(
//       { id: user._id, email: user.email, role: user.role },
//       process.env.JWT_SECRET,
//       (err, token) => {
//         if (err) throw err;
//         res.cookie("token", token);
//       }
//     );

//     res.status(200).json({ message: "Login successful", user, token });
//   } catch (error) {
//     res.status(500).json({
//       message: "Foydalanuvchi tizimga kirishda xatolik yuz berdi.",
//       error: error.message,
//     });
//   }
// };

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ message: "Register first. Your email is incorrect." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Password is not correct." });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token);

    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    res.status(500).json({
      message: "Foydalanuvchi tizimga kirishda xatolik yuz berdi.",
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  res.cookie("token", "").json(true);
};

const profile = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(404).json({ message: "Token mavjud emas" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, userData) => {
      if (err) {
        return res.status(401).json({ message: "Yaroqsiz token" });
      }

      try {
        const user = await User.findById(userData.id);
        if (!user) {
          return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
        }

        const { _id, name, email, role } = user;
        return res.status(200).json({ _id, name, email, role });
      } catch (error) {
        return res
          .status(404)
          .json({ message: "User topilmadi server", error });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error });
  }
};

module.exports = { register, login, logout, profile };
