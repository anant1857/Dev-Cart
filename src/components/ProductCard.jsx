const ProductCard = ({ product }) => (
  <div className="border rounded-lg p-4 shadow-lg flex flex-col h-[280px]"> 
    <img
      src={product.image}
      alt={product.title}
      className="h-40 mx-auto object-contain"
    />
    <h3 className="font-bold mt-2 text-center">{product.title}</h3>
    <p className="text-center">${product.price}</p>
  </div>
);

export default ProductCard;