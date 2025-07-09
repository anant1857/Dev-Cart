import React, { useContext } from "react";
import { WishlistContext } from "../context/WishListContext.jsx";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard"; 

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    try {
      addToCart(product);
      alert(`${product.title} has been added to your cart.`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart. Please try again.");
    }
  };

  const handleRemoveFromWishlist = (productId) => {
    try {
      removeFromWishlist(productId);
      alert("Product removed from wishlist.");
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      alert("Failed to remove from wishlist. Please try again.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl text-center font-bold mb-4">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="text-2xl font-semibold text-red-500 text-center ">Your wishlist is empty.</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product}>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleRemoveFromWishlist(product.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              </ProductCard>
            ))}
          </div>
          <div className="mt-6">
            <button
              onClick={clearWishlist}
              className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition"
            >
              Clear Wishlist
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;