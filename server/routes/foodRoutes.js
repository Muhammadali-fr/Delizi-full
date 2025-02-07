const { Router } = require("express");
const router = Router();
const multer = require("multer");
const path = require("path");
const {
  getAllFood,
  getFoodByID,
  addFood,
  deleteFood,
  updateFood,
} = require("../controllers/foodController");

const adminMiddleWare = require("../middleware/admin.js");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get("/", getAllFood); 

router.post("/add", adminMiddleWare, upload.single("image"), addFood);

router.get("/:id", getFoodByID);

router.put("/:id", updateFood);

router.delete("/:id", deleteFood);

module.exports = router;
