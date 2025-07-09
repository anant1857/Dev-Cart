import React, { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      alert("You need to log in to view your cart.");
      navigate("/login"); 
    }
  }, [isAuthenticated, navigate]);

  // Calculate total price
  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
    toast.success("Product removed from cart!"); 
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl  text-center font-bold mb-4">My Cart</h1>

      {cart.length === 0 ? (
        <p className="text-2xl text-center text-red-500 font-semibold">Your cart is empty.</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cart.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg p-4 shadow-lg flex flex-col items-center"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-40 w-auto mb-4"
                />
                <h3 className="font-bold text-lg mb-2 text-center">
                  {product.title}
                </h3>
                <p className="text-gray-500 mb-2">${product.price}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleRemoveFromCart(product.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
            <button
              onClick={clearCart}
              className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;