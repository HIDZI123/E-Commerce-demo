import { useState, useEffect } from "react";
import { ProductCard } from "../components/ProductCard";

export function Home() {
  const [query, setQuery] = useState("");
  interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    rating: number;
    stock: number;
  }
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:8000/api/products`);
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-16 bg-white rounded-lg shadow-sm mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to ModernShop
          </h1>
          <p className="text-xl text-gray-600">
            Discover amazing products at great prices
          </p>
          <input
            placeholder="Search for items here"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            className="max-w-3xl text-black border-2 py-2 px-3 mt-[1rem] hover:border-gray-500 focus:outline-none focus:border-gray-500 rounded-lg w-full"
          />
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
