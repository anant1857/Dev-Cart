import { useEffect, useState } from "react";
import { getProducts, getCategories, getProductsByCategory } from "../services/fakeStoreService";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner"; 
import { Link } from "react-router-dom"; 
import ProductFilter from "../components/ProductFilter"; 
import LazyLoad from 'react-lazyload';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null); 
  const [selectedCategory, setSelectedCategory] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData); 

        // Fetch all products by default
        const productsData = await getProducts();
        setProducts(productsData); 
      } catch (error) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category); 
    setLoading(true); 
    try {
      const productsData = await getProductsByCategory(category);
      setProducts(productsData); 
    } catch (error) {
      setError("Failed to fetch products for this category.");
    } finally {
      setLoading(false); 
    }
  };

  // Handle loading and error states
  if (error) {
    return <div className="error">{error}</div>; 
  }

  return (
    <div className="flex">
      {/* Sidebar for categories */}
      <ProductFilter 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onCategoryClick={handleCategoryClick} 
      />

      {/* Main content area for products */}
      <div className="w-3/4 ml-1/4 pl-4 py-4 pr-4 m-auto lg:ml-[25%] mb-8">
        <div className="relative">
          {loading ? (
            <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75">
              <Spinner />
            </div>
          ) : null}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${loading ? "opacity-50" : ""}`}>
            {products.length > 0 ? (
              products.map((product) => (
                <Link to={`/products/${product.id}`} key={product.id}>
                  {/* Lazy loading images */}
                  <LazyLoad height={200} offset={100}>
                    <ProductCard product={product} />
                  </LazyLoad>
                </Link>
              ))
            ) : (
              <p className="mt-32 text-center mx-auto">Something Went Wrong</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
