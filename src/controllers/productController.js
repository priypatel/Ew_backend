import Product from "../models/Product.js";

export const createProduct = async (req, res, next) => {
  try {
    const { name, price, category, stock } = req.body;
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }
    const imageUrl = `/uploads/${req.file.filename}`;

    const product = await Product.create({
      name,
      price,
      category,
      stock,
      imageUrl,
    });
    res.status(201).json({
      success: true,
      product,
    });
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { name, price, category, stock } = req.body;
    let product = await Product.findById(req.params.id);
    if (!product)
      return res
        .status(400)
        .json({ success: false, message: "Product not found." });

    let imageUrl = product.imageUrl;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }
    product.name = name ?? product.name;
    product.price = price ?? product.price;
    product.category = category ?? product.category;
    product.stock = stock ?? product.stock;
    product.imageUrl = imageUrl;

    await product.save();

    res.status(200).json({ success: true, product });
  } catch (err) {
    next(err);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, products });
  } catch (err) {
    next(err);
  }
};

export const getOneProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found." });
    }

    res.status(200).json({ success: true, product });
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found." });
    }

    res.status(200).json({ success: true, message: "Product removed" });
  } catch (err) {
    next(err);
  }
};
