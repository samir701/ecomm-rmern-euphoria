import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

// Constant variable to store product details
const womenProducts = [
  {
    id: 101,
    name: "Women's Summer Dress",
    price: "$39.99",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
  },
  {
    id: 102,
    name: "Women's Blouse",
    price: "$29.99",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
  },
  {
    id: 103,
    name: "Women's Jeans",
    price: "$34.99",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
  },
  {
    id: 104,
    name: "Women's Sneakers",
    price: "$49.99",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
  },
  {
    id: 105,
    name: "Women's Handbag",
    price: "$59.99",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
  },
  {
    id: 106,
    name: "Women's Jewelry Set",
    price: "$24.99",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
  },
  {
    id: 107,
    name: "Women's Scarf",
    price: "$14.99",
    image: "https://images.unsplash.com/photo-1520903920245-2d4c2f1a0c8e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
  },
  {
    id: 108,
    name: "Women's Sunglasses",
    price: "$19.99",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
  },
  {
    id: 109,
    name: "Women's Cardigan",
    price: "$29.99",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
  },
  {
    id: 110,
    name: "Women's Skirt",
    price: "$24.99",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
  },
  {
    id: 111,
    name: "Women's Heels",
    price: "$39.99",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
  },
  {
    id: 112,
    name: "Women's Tote Bag",
    price: "$34.99",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
  }
];

export default function Women() {
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="app-container">
      <div className="category-section">
        <h2 className="category-title">Women's Collection</h2>
        <div className="product-list">
          {womenProducts.map((product) => (
            <div 
              key={product.id} 
              className="product-card"
              onClick={() => handleProductClick(product.id)}
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="product-img"
              />
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 