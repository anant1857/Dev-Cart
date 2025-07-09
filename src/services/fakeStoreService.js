import axios from "axios";

const BASE_URL = "https://fakestoreapi.com";

// Create an axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
});

// Simple cache to store fetched data
const cache = {};

// Centralized error handling function
const handleError = (error) => {
  console.error("API Error:", error);
  throw error; 
};

// Fetch all products
export const getProducts = async () => {
  if (cache.products) {
    return cache.products; 
  }
  
  try {
    const response = await apiClient.get("/products");
    cache.products = response.data; 
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Fetch a single product by its ID
export const getProductById = async (id) => {
  if (cache[`product_${id}`]) {
    return cache[`product_${id}`]; 
  }

  try {
    const response = await apiClient.get(`/products/${id}`);
    cache[`product_${id}`] = response.data; 
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Fetch all product categories
export const getCategories = async () => {
  if (cache.categories) {
    return cache.categories; 
  }

  try {
    const response = await apiClient.get("/products/categories");
    cache.categories = response.data; 
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Fetch products filtered by category
export const getProductsByCategory = async (category) => {
  if (cache[`category_${category}`]) {
    return cache[`category_${category}`]; 
  }

  try {
    const response = await apiClient.get(`/products/category/${category}`);
    cache[`category_${category}`] = response.data; 
    return response.data;
  } catch (error) {
    handleError(error);
  }
};