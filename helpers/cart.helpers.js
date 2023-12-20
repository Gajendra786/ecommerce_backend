import { Cart } from "../models/cart.models.js";
// import { CartItem } from "../models/cartItem.models.js";
// import { Product } from "../models/product.models.js";

const createCart = async (user) => {
  try {
    const cart = new Cart({ user });
    return await cart.save();
  } catch (error) {
    throw new Error(error);
  }
};

export { createCart };