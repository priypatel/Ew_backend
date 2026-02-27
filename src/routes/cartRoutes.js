import express from "express";
import {
  addToCart,
  getUserCart,
  updateCartItem,
  removeCartItem,
} from "../controllers/cartController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/add", protect, addToCart);
router.put("/update/:productId", protect, updateCartItem);
router.delete("/remove/:productId", protect, removeCartItem);
router.get("/", protect, getUserCart);

export default router;
