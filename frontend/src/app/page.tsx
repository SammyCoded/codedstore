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
  
  const apiBase = process.env.NEXT_PUBLIC_API_URL;

  // Check login status on mount
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    // Prevent fetching if not logged in or API URL is missing
    if (!isLoggedIn || !apiBase) return;

    const fetchMarketplaceProducts = async () => {
      setMarketplaceLoading(true);
      try {
        const response = await fetch(`${apiBase}/api/products`, {
          headers: {
            // It's good practice to send the token if your backend requires it
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (response.ok) {
          const data = await response.json() as Product[];
          setMarketplaceProducts(data);
        } else {
          console.error('Fetch failed with status:', response.status);
        }
      } catch (error) {
        console.error('Homepage fetch error:', error);
      } finally {
        setMarketplaceLoading(false);
      }
    };

    fetchMarketplaceProducts();
  }, [apiBase, isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setMarketplaceProducts([]);
  };

  return (
    <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Marketplace</h1>
        {isLoggedIn && (
          <button onClick={handleLogout} style={{ padding: '8px 16px', cursor: 'pointer' }}>
            Logout
          </button>
        )}
      </header>

      <hr />

      {/* Loading State */}
      {marketplaceLoading && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p>Scanning the shelves for products...</p>
        </div>
      )}

      {/* Not Logged In State */}
      {!isLoggedIn && !marketplaceLoading && (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Welcome to CodedStore</h2>
          <p>Please log in to browse the marketplace.</p>
          <a href="/login"><button style={{ padding: '10px 20px' }}>Go to Login</button></a>
        </div>
      )}

      {/* Empty State */}
      {isLoggedIn && marketplaceProducts.length === 0 && !marketplaceLoading && (
        <p style={{ textAlign: 'center' }}>No products available right now. Check back later!</p>
      )}

      {/* Product Grid */}
      <section 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
          gap: '20px',
          marginTop: '20px' 
        }}
      >
        {marketplaceProducts.map((product) => (
          <article 
            key={product._id} 
            style={{ 
              border: '1px solid #ddd', 
              borderRadius: '8px', 
              padding: '15px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            {product.image && (
               // eslint-disable-next-line @next/next/no-img-element
               <img 
                 src={product.image} 
                 alt={product.title} 
                 style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }} 
               />
            )}
            <h3>{product.title}</h3>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>{product.description.substring(0, 100)}...</p>
            <p style={{ fontWeight: 'bold', color: '#2ecc71' }}>
              ${typeof product.price === 'number' ? product.price.toLocaleString() : product.price}
            </p>
            {product.seller?.name && (
              <small>Seller: {product.seller.name}</small>
            )}
          </article>
        ))}
      </section>
    </main>
  );
}