// WishlistContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    // Load wishlist from local storage or initialize as an empty array
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      const updatedWishlist = [...prev, product];
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // Save to local storage
      return updatedWishlist;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => {
      const updatedWishlist = prev.filter((item) => item.id !== productId);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // Save to local storage
      return updatedWishlist;
    });
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem("wishlist"); // Clear from local storage
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};