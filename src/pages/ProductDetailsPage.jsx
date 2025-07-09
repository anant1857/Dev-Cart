import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/fakeStoreService";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishListContext";
import { AuthContext } from "../context/AuthContext"; 
import Spinner from "../components/Spinner";
import toast from 'react-hot-toast'; 

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart, addToCart } = useContext(CartContext); 
  const { wishlist, addToWishlist } = useContext(WishlistContext); 
  const { isAuthenticated } = useContext(AuthContext); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError("Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (isAuthenticated) {
      // Check if the product is already in the cart
      const isProductInCart = cart.some(item => item.id === product.id);
      if (isProductInCart) {
        toast.error(`This item is already in your cart!`); 
      } else {
        addToCart(product);
        toast.success(`${product.title} has been added to your cart!`); 
      }
    } else {
      toast.error("You need to log in to add items to your cart."); 
      navigate("/login"); 
    }
  };

  const handleAddToWishlist = () => {
    if (isAuthenticated) {
      // Check if the product is already in the wishlist
      const isProductInWishlist = wishlist.some(item => item.id === product.id);
      if (isProductInWishlist) {
        toast.error(`This item is already in your wishlist!`); 
      } else {
        addToWishlist(product);
        toast.success(`${product.title} has been added to your wishlist!`); 
      }
    } else {
      toast.error("You need to log in to add items to your wishlist."); 
      navigate("/login"); 
    }
  };

  if (loading) return <Spinner />;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!product) return <div className="text-center mt-10">Product not found.</div>;

  return (
    <div className="container mt-[8%] mx-auto p-4 mb-5">
      <div className="flex flex-col justify-center p-6 items-center md:flex-row">
        {/* Product Image */}
        <div className="md:w-1/2 flex justify-center mb-4 md:mb-0">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[400px] max-w-md object-contain p-5 shadow-xl rounded-lg"
          />
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 md:pl-8 lg:pr-16 sm:pr-0">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold text-blue-500 mb-4">${product.price}</p>
          <p className="text-lg mb-4">
            <span className="font-semibold">Category:</span> {product.category}
          </p>
          <div className="flex space-x-4">
            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Add to Cart
            </button>

            {/* Add to Wishlist Button */}
            <button
              onClick={handleAddToWishlist}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;