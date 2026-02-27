import express from "express";
import Category from "../models/Category.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort("name");
    res.json({ success: true, categories });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to load categories",
    });
  }
});

export default router;
