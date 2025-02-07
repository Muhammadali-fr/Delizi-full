const Food = require("../models/foodModel");
const fs = require("fs");

const getAllFood = async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getFoodByID = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ error: "Food not found" });

    res.status(200).json(food);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addFood = async (req, res) => {
  try {
    const { title, descr, price } = req.body;

    if (!title || !descr || !price || !req.file) {
      return res
        .status(400)
        .json({ error: "All fields are required, including the image" });
    }

    const newFood = await Food.create({
      image: req.file.path,
      title,
      descr,
      price,
    });

    res.status(201).json({ message: "Food item created", food: newFood });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateFood = async (req, res) => {
  try {
    const { title, descr, price } = req.body;
    const food = await Food.findById(req.params.id);

    if (!food) return res.status(404).json({ error: "Food item not found" });

    let updatedData = { title, descr, price };

    if (req.file) {
      if (food.image) {
        fs.unlinkSync(food.image);
      }
      updatedData.image = req.file.path;
    }

    const updatedFood = await Food.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
      }
    );

    res.status(200).json(updatedFood);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ error: "Food item not found" });

    if (food.image) {
      fs.unlinkSync(food.image);
    }

    await Food.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Food item deleted", food });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllFood,
  getFoodByID,
  addFood,
  updateFood,
  deleteFood,
};
