const express = require("express");
require("dotenv").config();
const connectDb = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const authRoutes = require("./routes/auth");
const foodRoutes = require("./routes/foodRoutes");
const cartRoutes = require("./routes/cart");

connectDb();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api", cartRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Xush kelibsiz! Bu Home Page." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT} portda ishlayapti`));
