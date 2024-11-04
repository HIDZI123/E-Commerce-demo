import { useParams, useNavigate } from "react-router-dom";
import { Star, ShoppingCart, ArrowLeft } from "lucide-react";
/* import { products } from '../data/products'; */
import { Product } from "../types";
import { useStore } from "../store/useStore";
import { useState, useEffect } from "react";

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addToCart = useStore((state) => state.addToCart);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/products/${id}`
        );
        const data = await response.json();
        setProduct(data);
        console.log("Product Detail:", data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-96 w-full object-cover md:w-96"
                src={product.image}
                alt={product.name}
              />
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {product.name}
                  </h2>
                  <div className="mt-2 flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-2 text-gray-600">
                      {product.rating} rating
                    </span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </div>
              </div>

              <p className="mt-4 text-gray-600">{product.description}</p>

              <div className="mt-8">
                <div className="text-sm text-gray-600 mb-4">
                  {product.stock > 0 ? (
                    <span className="text-green-600">
                      {product.stock} in stock
                    </span>
                  ) : (
                    <span className="text-red-600">Out of stock</span>
                  )}
                </div>

                <button
                  onClick={() => {
                    addToCart(product);
                    navigate("/cart");
                  }}
                  disabled={product.stock === 0}
                  className="flex items-center justify-center w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
