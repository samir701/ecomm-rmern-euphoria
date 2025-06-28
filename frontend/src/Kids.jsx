import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

// Constant variable to store product details
const kidsProducts = [
  {
    id: 201,
    name: "Kids Casual T-Shirt",
    price: "$24.99",
    image: "https://images.unsplash.com/photo-1600023533868-d0a6101da971?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2lkcyUyMGNhc3VhbCUyMHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 202,
    name: "Children's Denim Jacket",
    price: "$39.99",
    image: "https://media.istockphoto.com/id/1488659816/photo/a-cute-sassy-4-year-old-cuban-american-toddler-girl-with-brown-eyes-brown-curly-hair-in-a.webp?a=1&b=1&s=612x612&w=0&k=20&c=CZu54MoCz-lRDbQQIJZ8Gw0hoBZrT2zeBZ4B00my9xA="
  },
  {
    id: 203,
    name: "Kids Summer Dress",
    price: "$29.99",
    image: "https://plus.unsplash.com/premium_photo-1724296697377-b03d8a9ba6fe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8S2lkcyUyMFN1bW1lciUyMERyZXNzfGVufDB8fDB8fHww"
  },
  {
    id: 204,
    name: "Children's Sneakers",
    price: "$34.99",
    image: "https://images.unsplash.com/photo-1585595322897-aaddf639a481?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Q2hpbGRyZW4ncyUyMFNuZWFrZXJzfGVufDB8fDB8fHww"
  },
  {
    id: 205,
    name: "Kids Winter Sweater",
    price: "$44.99",
    image: "https://plus.unsplash.com/premium_photo-1675033154326-4f8641603652?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8S2lkcyUyMFdpbnRlciUyMFN3ZWF0ZXJ8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 206,
    name: "Children's Jeans",
    price: "$27.99",
    image: "https://media.istockphoto.com/id/1287685667/photo/pair-of-cute-adorable-caucasian-blond-siblings-boy-and-girl-enjoy-have-fun-sitting-on-kitchen.webp?a=1&b=1&s=612x612&w=0&k=20&c=yJk9PhBkcsc8OhKGFABSEydAEFT76q5jgmRJ046kw-A="
  },
  {
    id: 207,
    name: "Kids Party Dress",
    price: "$49.99",
    image: "https://images.unsplash.com/photo-1656424692994-736ccef90d8e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8S2lkcyUyMFBhcnR5JTIwRHJlc3N8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 208,
    name: "Children's Hoodie",
    price: "$32.99",
    image: "https://plus.unsplash.com/premium_photo-1698305283034-6fc20d4bf946?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2hpbGRyZW4ncyUyMEhvb2RpZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 209,
    name: "Kids Sports Shorts",
    price: "$19.99",
    image: "https://images.unsplash.com/photo-1723980856085-8f8e725329a7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8S2lkcyUyMFNwb3J0cyUyMFNob3J0c3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 210,
    name: "Children's Formal Shirt",
    price: "$36.99",
    image: "https://images.meesho.com/images/products/448073952/4hvxu_1200.jpg"
  },
  {
    id: 211,
    name: "Kids Rain Jacket",
    price: "$41.99",
    image: "https://images.unsplash.com/photo-1662826086685-ed0a9cc86242?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8S2lkcyUyMFJhaW4lMjBKYWNrZXR8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 212,
    name: "Children's Pajamas",
    price: "$22.99",
    image: "https://images.unsplash.com/photo-1749560514481-b98f384aadf0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fENoaWxkcmVuJ3MlMjBQYWphbWFzfGVufDB8fDB8fHww"
  }
];

export default function Kids() {
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="app-container">
      <div className="category-section">
        <h2 className="category-title">Kid's Collection</h2>
        <div className="product-list">
          {kidsProducts.map((product) => (
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