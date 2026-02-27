import express from "express";
import upload from "../middlewares/upload.js";
import {
  createProduct,
  updateProduct,
  getAllProducts,
  getOneProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/", protect, upload.single("image"), createProduct);
router.put("/:id", protect, upload.single("image"), updateProduct);
router.get("/", getAllProducts);
router.get("/:id", getOneProduct);
router.delete("/:id", protect, deleteProduct);

// router.post("/login", loginUser);

export default router;
