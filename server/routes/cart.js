const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/user.model");

router.post("/add-cart", async (req, res) => {
  try {
    const { userId, foodId } = req.body;

    if (!userId || !foodId) {
      return res
        .status(400)
        .json({ message: "userId and foodId are required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const itemIndex = user.cart.findIndex(
      (item) => item.foodId.toString() === foodId
    );

    if (itemIndex > -1) {
      user.cart[itemIndex].quantity += 1;
    } else {
      user.cart.push({ foodId, quantity: 1 });
    }

    await user.save();

    const populatedUser = await User.findById(userId).populate("cart.foodId");
    res
      .status(200)
      .json({ message: "Food added to cart.", cart: populatedUser.cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/cart/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const user = await User.findById(userId).populate("cart.foodId");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
