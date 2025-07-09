import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartButton = ({ product }) => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  // Check if the product is already in the cart
  const isInCart = cart.some((item) => item.id === product.id);

  return (
    <div>
      {isInCart ? (
        <button
          onClick={() => removeFromCart(product.id)}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          Remove from Cart
        </button>
      ) : (
        <button
          onClick={() => addToCart(product)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default CartButton;
