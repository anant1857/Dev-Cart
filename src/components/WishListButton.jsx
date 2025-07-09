import React, { useContext } from "react";
import { WishlistContext } from "../context/WishListContext";

const WishlistButton = ({ product }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

  // Check if the product is already in the wishlist
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  return (
    <div>
      {isInWishlist ? (
        <button
          onClick={() => removeFromWishlist(product.id)}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          Remove from Wishlist
        </button>
      ) : (
        <button
          onClick={() => addToWishlist(product)}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
        >
          Add to Wishlist
        </button>
      )}
    </div>
  );
};

export default WishlistButton;
