import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

// Constant variable to store product details
const menProducts = [
  {
    id: 1,
    name: "Men's Classic Denim Jacket",
    price: "$49.99",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    name: "Men's White Sneakers",
    price: "$59.99",
    image: "https://img.tatacliq.com/images/i17//437Wx649H/MP000000018869727_437Wx649H_202405170753331.jpeg"
  },
  {
    id: 3,
    name: "Men's Black T-shirt",
    price: "$19.99",
    image: "https://triprindia.com/cdn/shop/files/BLZ1331.jpg?v=1739506823"
  },
  {
    id: 4,
    name: "Men's Slim Fit Jeans",
    price: "$39.99",
    image: "https://cdn.linenclub.com/media/catalog/product/cache/d8d099ed0f54be45d4eb2c71c1a3b40d/c/o/codnsdj929547_1.jpg"
  },
  {
    id: 5,
    name: "Men's Summer Linen Shirt",
    price: "$34.99",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 6,
    name: "Men's Trendy Sunglasses",
    price: "$24.99",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
  },
  {
    id: 7,
    name: "Men's Canvas Tote Bag",
    price: "$19.99",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWu2YQIs9bQO9CUX31bfIf7vhfTj5DKpMrcQ&s"
  },
  {
    id: 8,
    name: "Men's Lightweight Sneakers",
    price: "$44.99",
    image: "https://bugattishoes.in/cdn/shop/files/325-86705-5050-2012.jpg?v=1746781898"
  },
  {
    id: 9,
    name: "Men's Formal Shirt",
    price: "$36.99",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
  },
  {
    id: 10,
    name: "Men's Winter Sweater",
    price: "$44.99",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
  },
  {
    id: 11,
    name: "Men's Hoodie",
    price: "$32.99",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
  },
  {
    id: 12,
    name: "Men's Sports Shorts",
    price: "$19.99",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
  }
];

export default function Men() {
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="app-container">
      <div className="category-section">
        <h2 className="category-title">Men's Collection</h2>
        <div className="product-list">
          {menProducts.map((product) => (
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