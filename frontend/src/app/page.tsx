import { useState, useEffect } from 'react';

type Product = {
  _id: string;
  title: string;
  price: string | number;
  description: string;
  address?: string;
  image?: string;
  seller?: {
    name?: string;
  };
};

export default function HomePage() {
  const [marketplaceProducts, setMarketplaceProducts] = useState<Product[]>([]);
  const [marketplaceLoading, setMarketplaceLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // ✅ This pulls from your .env.local file
  const apiBase = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    }
  }, []);

  useEffect(() => {
    // 🛑 SAFETY GUARD: Stop if not logged in OR if the API URL is missing
    if (!isLoggedIn || !apiBase) {
      if (!apiBase && isLoggedIn) {
        console.warn("⚠️ NEXT_PUBLIC_API_URL is not defined in your environment variables.");
      }
      return;
    }

    const fetchMarketplaceProducts = async () => {
      setMarketplaceLoading(true);
      try {
        // ✅ The URL will now only be built if apiBase exists
        const response = await fetch(`${apiBase}/api/products`);
        
        if (response.ok) {
          const data = await response.json() as Product[];
          setMarketplaceProducts(data);
        } else {
          console.error('Failed to fetch marketplace products: Status', response.status);
        }
      } catch (error) {
        console.error('Homepage fetch error:', error);
      } finally {
        setMarketplaceLoading(false);
      }
    };

    fetchMarketplaceProducts();
  }, [apiBase, isLoggedIn]);

  return (
    <div>
      {/* Your UI code remains the same below */}
      <h1>Marketplace</h1>
      {marketplaceLoading && <p>Loading products...</p>}
      {!isLoggedIn && <p>Please log in to see products.</p>}
      {isLoggedIn && marketplaceProducts.length === 0 && !marketplaceLoading && <p>No products found.</p>}
      
      <div className="product-grid">
        {marketplaceProducts.map((product) => (
          <div key={product._id}>
            <h3>{product.title}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}