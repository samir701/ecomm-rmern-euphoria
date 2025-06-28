import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './App.css';

// Constant variable to store product details for all categories
const allProducts = {
  men: [
    {
      id: 1,
      name: "Men's Classic Denim Jacket",
      price: "$49.99",
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
      title: "Premium Denim Jacket for Men",
      description: "A timeless denim jacket crafted from premium cotton denim. Features a classic fit with comfortable stretch and durable construction. Perfect for casual outings and everyday wear.",
      features: ["100% Cotton Denim", "Classic Fit", "Durable Construction", "Comfortable Stretch", "Multiple Pockets"],
      rating: 4.5,
      reviews: 128,
      inStock: true
    },
    {
      id: 2,
      name: "Men's White Sneakers",
      price: "$59.99",
      image: "https://img.tatacliq.com/images/i17//437Wx649H/MP000000018869727_437Wx649H_202405170753331.jpeg",
      title: "Classic White Sneakers",
      description: "Versatile white sneakers with a clean, minimalist design. Made with breathable materials and cushioned sole for all-day comfort. Perfect for both casual and semi-formal occasions.",
      features: ["Breathable Materials", "Cushioned Sole", "Slip-resistant", "Easy to Clean", "Versatile Design"],
      rating: 4.3,
      reviews: 95,
      inStock: true
    },
    {
      id: 3,
      name: "Men's Black T-shirt",
      price: "$19.99",
      image: "https://triprindia.com/cdn/shop/files/BLZ1331.jpg?v=1739506823",
      title: "Essential Black T-shirt",
      description: "A wardrobe essential made from 100% organic cotton. Features a comfortable fit and soft texture that gets better with every wash. Perfect for layering or wearing on its own.",
      features: ["100% Organic Cotton", "Comfortable Fit", "Soft Texture", "Pre-shrunk", "Machine Washable"],
      rating: 4.7,
      reviews: 203,
      inStock: true
    },
    {
      id: 4,
      name: "Men's Slim Fit Jeans",
      price: "$39.99",
      image: "https://cdn.linenclub.com/media/catalog/product/cache/d8d099ed0f54be45d4eb2c71c1a3b40d/c/o/codnsdj929547_1.jpg",
      title: "Slim Fit Denim Jeans",
      description: "Modern slim fit jeans with a touch of stretch for maximum comfort. Features a classic five-pocket design and durable denim construction that lasts through daily wear.",
      features: ["Slim Fit", "Stretch Denim", "Five-pocket Design", "Durable Construction", "Modern Style"],
      rating: 4.4,
      reviews: 156,
      inStock: true
    },
    {
      id: 5,
      name: "Men's Summer Linen Shirt",
      price: "$34.99",
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
      title: "Breathable Linen Summer Shirt",
      description: "Lightweight linen shirt perfect for warm weather. Features natural breathability and a relaxed fit that keeps you cool and comfortable throughout the day.",
      features: ["100% Linen", "Breathable", "Relaxed Fit", "Natural Material", "Summer Ready"],
      rating: 4.6,
      reviews: 87,
      inStock: true
    },
    {
      id: 6,
      name: "Men's Trendy Sunglasses",
      price: "$24.99",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      title: "Stylish UV Protection Sunglasses",
      description: "Trendy sunglasses with 100% UV protection and polarized lenses. Features a lightweight frame and comfortable fit for all-day wear during outdoor activities.",
      features: ["100% UV Protection", "Polarized Lenses", "Lightweight Frame", "Comfortable Fit", "Trendy Design"],
      rating: 4.2,
      reviews: 73,
      inStock: true
    },
    {
      id: 7,
      name: "Men's Canvas Tote Bag",
      price: "$19.99",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWu2YQIs9bQO9CUX31bfIf7vhfTj5DKpMrcQ&s",
      title: "Durable Canvas Tote Bag",
      description: "Spacious canvas tote bag perfect for daily essentials. Features reinforced handles and multiple compartments for organized storage. Ideal for work, shopping, or travel.",
      features: ["Durable Canvas", "Reinforced Handles", "Multiple Compartments", "Spacious Design", "Versatile Use"],
      rating: 4.1,
      reviews: 45,
      inStock: true
    },
    {
      id: 8,
      name: "Men's Lightweight Sneakers",
      price: "$44.99",
      image: "https://bugattishoes.in/cdn/shop/files/325-86705-5050-2012.jpg?v=1746781898",
      title: "Ultra Lightweight Running Sneakers",
      description: "Ultra-lightweight sneakers designed for maximum comfort and performance. Features advanced cushioning technology and breathable mesh upper for optimal airflow.",
      features: ["Ultra Lightweight", "Advanced Cushioning", "Breathable Mesh", "Performance Design", "Comfortable Fit"],
      rating: 4.8,
      reviews: 189,
      inStock: true
    },
    {
      id: 9,
      name: "Men's Formal Shirt",
      price: "$36.99",
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      title: "Classic Formal Business Shirt",
      description: "Professional formal shirt perfect for business meetings and office wear. Features a crisp cotton construction and tailored fit for a polished appearance.",
      features: ["Crisp Cotton", "Tailored Fit", "Professional Design", "Easy Iron", "Business Ready"],
      rating: 4.5,
      reviews: 112,
      inStock: true
    },
    {
      id: 10,
      name: "Men's Winter Sweater",
      price: "$44.99",
      image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      title: "Warm Winter Sweater",
      description: "Cozy winter sweater made from premium wool blend. Features a comfortable fit and excellent insulation to keep you warm during cold weather.",
      features: ["Premium Wool Blend", "Warm Insulation", "Comfortable Fit", "Durable Material", "Winter Essential"],
      rating: 4.6,
      reviews: 134,
      inStock: true
    },
    {
      id: 11,
      name: "Men's Hoodie",
      price: "$32.99",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      title: "Comfortable Cotton Hoodie",
      description: "Soft cotton hoodie perfect for casual wear. Features a comfortable fit, adjustable drawstring hood, and kangaroo pocket for convenience.",
      features: ["Soft Cotton", "Adjustable Hood", "Kangaroo Pocket", "Comfortable Fit", "Casual Style"],
      rating: 4.4,
      reviews: 98,
      inStock: true
    },
    {
      id: 12,
      name: "Men's Sports Shorts",
      price: "$19.99",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      title: "Performance Sports Shorts",
      description: "Lightweight sports shorts designed for maximum mobility and comfort during workouts. Features moisture-wicking technology and an elastic waistband.",
      features: ["Moisture-wicking", "Elastic Waistband", "Lightweight Design", "Maximum Mobility", "Workout Ready"],
      rating: 4.3,
      reviews: 67,
      inStock: true
    }
  ],
  women: [
    {
      id: 101,
      name: "Women's Summer Dress",
      price: "$39.99",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      title: "Elegant Summer Floral Dress",
      description: "Beautiful floral print dress perfect for summer occasions. Features a flattering silhouette, comfortable fit, and lightweight fabric that keeps you cool and stylish.",
      features: ["Floral Print", "Flattering Silhouette", "Lightweight Fabric", "Summer Ready", "Versatile Design"],
      rating: 4.7,
      reviews: 156,
      inStock: true
    },
    {
      id: 102,
      name: "Women's Blouse",
      price: "$29.99",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      title: "Elegant Silk Blouse",
      description: "Sophisticated silk blouse with a modern cut and elegant design. Perfect for professional settings or special occasions. Features a comfortable fit and easy-care fabric.",
      features: ["Silk Material", "Modern Cut", "Professional Design", "Easy Care", "Elegant Style"],
      rating: 4.5,
      reviews: 89,
      inStock: true
    },
    {
      id: 103,
      name: "Women's Jeans",
      price: "$34.99",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      title: "High-Waist Skinny Jeans",
      description: "Trendy high-waist skinny jeans with a flattering fit. Features stretch denim for comfort and a modern silhouette that pairs perfectly with any top.",
      features: ["High-Waist Design", "Stretch Denim", "Skinny Fit", "Flattering Silhouette", "Versatile Style"],
      rating: 4.6,
      reviews: 203,
      inStock: true
    },
    {
      id: 104,
      name: "Women's Sneakers",
      price: "$49.99",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      title: "Comfortable Fashion Sneakers",
      description: "Stylish sneakers that combine fashion and comfort. Features a cushioned sole, breathable upper, and trendy design that works for both casual and active wear.",
      features: ["Cushioned Sole", "Breathable Upper", "Trendy Design", "Comfortable Fit", "Versatile Use"],
      rating: 4.4,
      reviews: 127,
      inStock: true
    },
    {
      id: 105,
      name: "Women's Handbag",
      price: "$59.99",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      title: "Elegant Leather Handbag",
      description: "Sophisticated leather handbag with multiple compartments and elegant design. Perfect for daily use, featuring durable construction and timeless style.",
      features: ["Genuine Leather", "Multiple Compartments", "Durable Construction", "Timeless Design", "Daily Use"],
      rating: 4.8,
      reviews: 178,
      inStock: true
    },
    {
      id: 106,
      name: "Women's Jewelry Set",
      price: "$24.99",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      title: "Elegant Jewelry Collection",
      description: "Beautiful jewelry set featuring necklace and earrings. Made from high-quality materials with elegant design perfect for special occasions.",
      features: ["High-Quality Materials", "Elegant Design", "Matching Set", "Special Occasions", "Timeless Style"],
      rating: 4.3,
      reviews: 95,
      inStock: true
    },
    {
      id: 107,
      name: "Women's Scarf",
      price: "$14.99",
      image: "https://images.unsplash.com/photo-1520903920245-2d4c2f1a0c8e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      title: "Soft Winter Scarf",
      description: "Luxuriously soft scarf perfect for cold weather. Features a beautiful pattern and comfortable fabric that keeps you warm and stylish.",
      features: ["Soft Material", "Beautiful Pattern", "Warm Insulation", "Comfortable Fit", "Winter Essential"],
      rating: 4.2,
      reviews: 67,
      inStock: true
    },
    {
      id: 108,
      name: "Women's Sunglasses",
      price: "$19.99",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      title: "Trendy UV Protection Sunglasses",
      description: "Fashionable sunglasses with 100% UV protection and trendy frame design. Perfect for sunny days and outdoor activities.",
      features: ["100% UV Protection", "Trendy Frame", "Lightweight Design", "Comfortable Fit", "Fashion Forward"],
      rating: 4.1,
      reviews: 83,
      inStock: true
    },
    {
      id: 109,
      name: "Women's Cardigan",
      price: "$29.99",
      image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      title: "Soft Knit Cardigan",
      description: "Comfortable knit cardigan perfect for layering. Features a soft texture, comfortable fit, and versatile design that works with any outfit.",
      features: ["Soft Knit", "Comfortable Fit", "Versatile Design", "Easy Layering", "Casual Style"],
      rating: 4.5,
      reviews: 112,
      inStock: true
    },
    {
      id: 110,
      name: "Women's Skirt",
      price: "$24.99",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      title: "Elegant Midi Skirt",
      description: "Elegant midi skirt with a flattering silhouette. Perfect for office wear or special occasions, featuring a comfortable fit and timeless design.",
      features: ["Midi Length", "Flattering Silhouette", "Office Ready", "Timeless Design", "Comfortable Fit"],
      rating: 4.4,
      reviews: 76,
      inStock: true
    },
    {
      id: 111,
      name: "Women's Heels",
      price: "$39.99",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      title: "Classic High Heels",
      description: "Classic high heels with elegant design and comfortable construction. Perfect for formal occasions and professional settings.",
      features: ["Classic Design", "Comfortable Construction", "Formal Occasions", "Professional Style", "Elegant Look"],
      rating: 4.3,
      reviews: 94,
      inStock: true
    },
    {
      id: 112,
      name: "Women's Tote Bag",
      price: "$34.99",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      title: "Spacious Canvas Tote",
      description: "Spacious canvas tote bag perfect for daily essentials. Features durable construction and multiple compartments for organized storage.",
      features: ["Spacious Design", "Durable Canvas", "Multiple Compartments", "Daily Use", "Organized Storage"],
      rating: 4.2,
      reviews: 58,
      inStock: true
    }
  ],
  kids: [
    {
      id: 201,
      name: "Kids Casual T-Shirt",
      price: "$24.99",
      image: "https://images.unsplash.com/photo-1600023533868-d0a6101da971?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2lkcyUyMGNhc3VhbCUyMHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D",
      title: "Comfortable Kids T-Shirt",
      description: "Soft and comfortable t-shirt designed specifically for kids. Features breathable cotton material and fun designs that children love to wear.",
      features: ["Soft Cotton", "Breathable Material", "Fun Designs", "Comfortable Fit", "Kid-Friendly"],
      rating: 4.6,
      reviews: 89,
      inStock: true
    },
    {
      id: 202,
      name: "Children's Denim Jacket",
      price: "$39.99",
      image: "https://media.istockphoto.com/id/1488659816/photo/a-cute-sassy-4-year-old-cuban-american-toddler-girl-with-brown-eyes-brown-curly-hair-in-a.webp?a=1&b=1&s=612x612&w=0&k=20&c=CZu54MoCz-lRDbQQIJZ8Gw0hoBZrT2zeBZ4B00my9xA=",
      title: "Classic Kids Denim Jacket",
      description: "Timeless denim jacket perfect for kids. Features durable construction, comfortable fit, and classic style that never goes out of fashion.",
      features: ["Durable Denim", "Comfortable Fit", "Classic Style", "Kid-Sized", "Long-lasting"],
      rating: 4.5,
      reviews: 67,
      inStock: true
    },
    {
      id: 203,
      name: "Kids Summer Dress",
      price: "$29.99",
      image: "https://plus.unsplash.com/premium_photo-1724296697377-b03d8a9ba6fe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8S2lkcyUyMFN1bW1lciUyMERyZXNzfGVufDB8fDB8fHww",
      title: "Adorable Summer Dress",
      description: "Beautiful summer dress perfect for little girls. Features lightweight fabric, comfortable fit, and adorable designs that make every day special.",
      features: ["Lightweight Fabric", "Comfortable Fit", "Adorable Design", "Summer Ready", "Special Occasions"],
      rating: 4.7,
      reviews: 123,
      inStock: true
    },
    {
      id: 204,
      name: "Children's Sneakers",
      price: "$34.99",
      image: "https://images.unsplash.com/photo-1585595322897-aaddf639a481?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Q2hpbGRyZW4ncyUyMFNuZWFrZXJzfGVufDB8fDB8fHww",
      title: "Comfortable Kids Sneakers",
      description: "Comfortable and durable sneakers designed for active kids. Features cushioned soles, breathable materials, and fun colors that children love.",
      features: ["Cushioned Soles", "Breathable Materials", "Fun Colors", "Durable Design", "Active Kids"],
      rating: 4.4,
      reviews: 95,
      inStock: true
    },
    {
      id: 205,
      name: "Kids Winter Sweater",
      price: "$44.99",
      image: "https://plus.unsplash.com/premium_photo-1675033154326-4f8641603652?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8S2lkcyUyMFdpbnRlciUyMFN3ZWF0ZXJ8ZW58MHx8MHx8fDA%3D",
      title: "Warm Kids Winter Sweater",
      description: "Cozy winter sweater designed to keep kids warm and comfortable. Features soft materials and fun designs that children enjoy wearing.",
      features: ["Warm Insulation", "Soft Materials", "Fun Designs", "Comfortable Fit", "Winter Essential"],
      rating: 4.6,
      reviews: 78,
      inStock: true
    },
    {
      id: 206,
      name: "Children's Jeans",
      price: "$27.99",
      image: "https://media.istockphoto.com/id/1287685667/photo/pair-of-cute-adorable-caucasian-blond-siblings-boy-and-girl-enjoy-have-fun-sitting-on-kitchen.webp?a=1&b=1&s=612x612&w=0&k=20&c=yJk9PhBkcsc8OhKGFABSEydAEFT76q5jgmRJ046kw-A=",
      title: "Durable Kids Jeans",
      description: "Durable jeans designed to withstand active play. Features stretch denim, comfortable fit, and reinforced construction for long-lasting wear.",
      features: ["Stretch Denim", "Comfortable Fit", "Reinforced Construction", "Active Play", "Long-lasting"],
      rating: 4.3,
      reviews: 56,
      inStock: true
    },
    {
      id: 207,
      name: "Kids Party Dress",
      price: "$49.99",
      image: "https://images.unsplash.com/photo-1656424692994-736ccef90d8e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8S2lkcyUyMFBhcnR5JTIwRHJlc3N8ZW58MHx8MHx8fDA%3D",
      title: "Beautiful Party Dress",
      description: "Stunning party dress perfect for special occasions. Features elegant design, comfortable fit, and beautiful details that make every celebration special.",
      features: ["Elegant Design", "Comfortable Fit", "Beautiful Details", "Special Occasions", "Celebration Ready"],
      rating: 4.8,
      reviews: 134,
      inStock: true
    },
    {
      id: 208,
      name: "Children's Hoodie",
      price: "$32.99",
      image: "https://plus.unsplash.com/premium_photo-1698305283034-6fc20d4bf946?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2hpbGRyZW4ncyUyMEhvb2RpZXxlbnwwfHwwfHx8MA%3D%3D",
      title: "Cozy Kids Hoodie",
      description: "Warm and cozy hoodie perfect for kids. Features soft materials, comfortable fit, and fun designs that children love to wear.",
      features: ["Soft Materials", "Comfortable Fit", "Fun Designs", "Warm Insulation", "Kid-Friendly"],
      rating: 4.5,
      reviews: 87,
      inStock: true
    },
    {
      id: 209,
      name: "Kids Sports Shorts",
      price: "$19.99",
      image: "https://images.unsplash.com/photo-1723980856085-8f8e725329a7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8S2lkcyUyMFNwb3J0cyUyMFNob3J0c3xlbnwwfHwwfHx8MA%3D%3D",
      title: "Active Kids Sports Shorts",
      description: "Comfortable sports shorts designed for active children. Features lightweight materials, comfortable fit, and fun colors for sports and play.",
      features: ["Lightweight Materials", "Comfortable Fit", "Fun Colors", "Sports Ready", "Active Play"],
      rating: 4.2,
      reviews: 45,
      inStock: true
    },
    {
      id: 210,
      name: "Children's Formal Shirt",
      price: "$36.99",
      image: "https://images.meesho.com/images/products/448073952/4hvxu_1200.jpg",
      title: "Smart Kids Formal Shirt",
      description: "Smart formal shirt perfect for special occasions and school events. Features crisp cotton, comfortable fit, and professional appearance.",
      features: ["Crisp Cotton", "Comfortable Fit", "Professional Look", "Special Occasions", "School Ready"],
      rating: 4.4,
      reviews: 67,
      inStock: true
    },
    {
      id: 211,
      name: "Kids Rain Jacket",
      price: "$41.99",
      image: "https://images.unsplash.com/photo-1662826086685-ed0a9cc86242?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      title: "Waterproof Kids Rain Jacket",
      description: "Waterproof rain jacket designed to keep kids dry and comfortable. Features durable materials, comfortable fit, and fun designs for rainy days.",
      features: ["Waterproof Material", "Durable Construction", "Comfortable Fit", "Fun Designs", "Rainy Day Ready"],
      rating: 4.3,
      reviews: 52,
      inStock: true
    },
    {
      id: 212,
      name: "Children's Pajamas",
      price: "$22.99",
      image: "https://images.unsplash.com/photo-1749560516414-5b8b3b3b3b3b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      title: "Comfortable Kids Pajamas",
      description: "Soft and comfortable pajamas perfect for bedtime. Features breathable materials, comfortable fit, and fun designs that children love.",
      features: ["Soft Materials", "Breathable Fabric", "Comfortable Fit", "Fun Designs", "Bedtime Ready"],
      rating: 4.6,
      reviews: 89,
      inStock: true
    }
  ]
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find product across all categories
  const findProduct = (productId) => {
    const allProductsArray = [
      ...allProducts.men,
      ...allProducts.women,
      ...allProducts.kids
    ];
    return allProductsArray.find(product => product.id === parseInt(productId));
  };

  const product = findProduct(id);

  if (!product) {
    return (
      <div className="app-container">
        <div className="product-detail-container">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back to Products
          </button>
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <h2>Product Not Found</h2>
            <p>The product you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="product-detail-container">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
        
        <div className="product-detail-content">
          <div className="product-image-section">
            <img 
              src={product.image} 
              alt={product.name} 
              className="product-detail-image"
            />
          </div>
          
          <div className="product-info-section">
            <h1 className="product-detail-title">{product.title}</h1>
            
            <div className="product-rating">
              {[...Array(5)].map((_, index) => (
                <span 
                  key={index} 
                  className={`star ${index < Math.floor(product.rating) ? 'filled' : ''}`}
                >
                  ★
                </span>
              ))}
              <span className="rating-text">({product.rating}) • {product.reviews} reviews</span>
            </div>
            
            <div className="product-price-large">{product.price}</div>
            
            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
            
            <div className="product-features">
              <h3>Features</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            
            <div className="product-options">
              <div className="size-selection">
                <h3>Size</h3>
                <div className="size-buttons">
                  {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                    <button key={size} className="size-btn">
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="quantity-selection">
                <h3>Quantity</h3>
                <div className="quantity-controls">
                  <button className="quantity-btn">-</button>
                  <span className="quantity-display">1</span>
                  <button className="quantity-btn">+</button>
                </div>
              </div>
            </div>
            
            <div className="product-actions">
              <button 
                className={`add-to-cart-btn ${!product.inStock ? 'disabled' : ''}`}
                disabled={!product.inStock}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button className="buy-now-btn">Buy Now</button>
            </div>
            
            <div className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
              {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 