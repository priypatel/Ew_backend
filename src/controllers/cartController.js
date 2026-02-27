import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;
    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "Product is required" });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found" });
    }
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [{ product: productId, quantity }],
      });
      return res.status(201).json({
        success: true,
        cart,
      });
    }

    if (!Array.isArray(cart.items)) {
      cart.items = [];
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId.toString(),
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
    await cart.save();

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (err) {
    next(err);
  }
};

export const updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const productId = req.params.productId;

    if (quantity < 1) {
      return res
        .status(400)
        .json({ success: false, message: "Quantity must be 1" });
    }
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res
        .status(400)
        .json({ success: false, message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId.toString(),
    );

    if (itemIndex == -1) {
      return res
        .status(400)
        .json({ success: false, message: "Item not found" });
    }
    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    const populatedCart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
    );
    return res.status(200).json({ success: true, cart: populatedCart });
  } catch (err) {
    next(err);
  }
};

export const removeCartItem = async (req, res, next) => {
  try {
    const productId = req.params.productId;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res
        .status(400)
        .json({ success: false, message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId.toString(),
    );

    await cart.save();
    const populatedCart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
    );
    return res.status(200).json({ success: true, cart: populatedCart });
  } catch (err) {
    next(err);
  }
};

export const getUserCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
    );

    return res.status(200).json({
      success: true,
      cart: cart || { items: [] },
    });
  } catch (err) {
    next(err);
  }
};
