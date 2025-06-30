import React from 'react';
import './App.css';
import shoppingBagIcon from './assets/shopping-bag.svg';
import cartIcon from './assets/cart.svg';
// import modelImg from './assets/model.png';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Men from './Men';
import Women from './Women';
import Kids from './Kids';
import ProductDetail from './ProductDetail';
import Cart from './Cart';
import { CartProvider, useCart } from './CartContext';
import Checkout from './Checkout';
import { useForm, ValidationError } from '@formspree/react';
import Login from './Login';
import Register from './Register';
import { AuthProvider, useAuth } from './AuthContext';

const modelImg = "https://5.imimg.com/data5/SELLER/Default/2023/8/331924568/XU/AU/II/113132364/sari-photography-services-with-model-for-e-commerce-website-5-500x500.jpg";

const newCollectionProducts = [
  {
    id: 1,
    name: 'Summer Linen Shirt',
    price: '$34.99',
    img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'Trendy Sunglasses',
    price: '$24.99',
    img: 'data:image/jpeg;base64,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',
  },
  {
    id: 3,
    name: 'Canvas Tote Bag',
    price: '$19.99',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWu2YQIs9bQO9CUX31bfIf7vhfTj5DKpMrcQ&s',
  },
  {
    id: 4,
    name: 'Lightweight Sneakers',
    price: '$44.99',
    img: 'https://bugattishoes.in/cdn/shop/files/325-86705-5050-2012.jpg?v=1746781898',
  },
  {
    id: 5,
    name: 'Kids shirt',
    price: '$20.99',
    img: 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/30723939/2024/9/18/2d12cc33-bc51-43e2-852a-16f013789e761726683415873-Peekaaboo-Kids-Boys-Shirt-with-Trousers-5091726683415528-1.jpg',
  },
  {
    id: 6,
    name: 'hair Band',
    price: '$2.99',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpc6SnezC_bHOtIACVtriGyngKw8KYIcAiwg&s',
  },
  {
    id: 7,
    name: 'Handcuffs',
    price: '$30.99',
    img: 'https://cdn.igp.com/f_auto,q_auto,t_pnopt19prodlp/products/p-handcuffs-218996-m.jpg',
  },
  {
    id: 8,
    name: 'JBL boombox 200W',
    price: '$440.99',
    img: 'https://image.made-in-china.com/202f0j00BdaklmWhkjqr/W-Kings-Wireless-D20-Powerful-200W-Audio-Speaker-Ipx6-Waterproof-Outdoor-Boombox-Bluetooth-Speaker-with-Fast-Charging.webp',
  }
];

function Navbar() {
  const { cart } = useCart();
  const { token, user, logout } = useAuth();
  return (
    <header className="header">
      <div className="logo-section">
        <img src={shoppingBagIcon} alt="Shopping Bag" className="logo-icon" />
        <span className="logo-text">SHOPPER</span>
      </div>
      <nav className="nav-menu">
        <Link to="/" >Shop</Link>
        <Link to="/men">Men</Link>
        <Link to="/women">Women</Link>
        <Link to="/kids">Kids</Link>
      </nav>
      <div className="header-actions">
        {token ? (
          <>
            <span className="user-name" style={{ marginRight: 12 }}>
              {user?.name || user?.email || 'User'}
            </span>
            <button className="login-btn" onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login" className="login-btn">Login</Link>
        )}
        <Link to="/cart" className="cart-icon">
          <img src={cartIcon} alt="Cart" className="cart-svg" />
          <span className="cart-badge">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
        </Link>
      </div>
    </header>
  );
}

function HomePage() {
  return (
    <div className="app-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <p className="arrival-text"><b>NEW ARRIVALS ONLY</b></p>
          <h1 className="hero-title">
            new <span className="wave">👋</span><br />collections<br />for everyone
          </h1>
          <button className="latest-btn">Latest Collection →</button>
        </div>
        <div className="hero-image">
          <img src={modelImg} alt="Fashion Model" className="model-img" />
        </div>
      </section>

      {/* Popular in Men Section */}
      <section className="category-section">
        <h2 className="category-title">POPULAR IN MEN</h2>
        <div className="product-list">
          {[
            {
              id: 1,
              name: 'Classic Denim Jacket',
              price: '$49.99',
              img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
            },
            {
              id: 2,
              name: 'White Sneakers',
              price: '$59.99',
              img: 'https://img.tatacliq.com/images/i17//437Wx649H/MP000000018869727_437Wx649H_202405170753331.jpeg',
            },
            {
              id: 3,
              name: 'Black T-shirt',
              price: '$19.99',
              img: 'https://triprindia.com/cdn/shop/files/BLZ1331.jpg?v=1739506823',
            },
            {
              id: 4,
              name: 'Slim Fit Jeans',
              price: '$39.99',
              img: 'https://cdn.linenclub.com/media/catalog/product/cache/d8d099ed0f54be45d4eb2c71c1a3b40d/c/o/codnsdj929547_1.jpg',
            },
          ].map(product => (
            <div className="product-card" key={product.id}>
              <img src={product.img} alt={product.name} className="product-img" />
              <div className="product-info">
                <div className="product-name">{product.name}</div>
                <div className="product-price">{product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Banner Section: Exclusive Offer */}
      <section className="banner-section">
        <div className="banner-content">
          <div className="banner-text">
            <span className="banner-offer">EXCLUSIVE OFFER</span>
            <h2 className="banner-title">Special Launch for Rath Yatra!</h2>
            <p className="banner-desc">Celebrate Rath Yatra with our limited edition collection. Grab your favorites before they're gone!</p>
            <button className="banner-btn">Shop Now</button>
          </div>
          <img className="banner-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfMqFS3jLSc1mBsaJOpYnpplMAvn4UNQ7b2Q&s" alt="Rath Yatra Special" />
        </div>
      </section>

      {/* New Collection Section */}
      <section className="category-section">
        <h2 className="category-title">NEW COLLECTION</h2>
        <div className="product-list">
          {newCollectionProducts.map(product => (
            <div className="product-card" key={product.id}>
              <img src={product.img} alt={product.name} className="product-img" />
              <div className="product-info">
                <div className="product-name">{product.name}</div>
                <div className="product-price">{product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feedback/Contact Section */}
      <section className="feedback-section">
        <h2 className="feedback-title">Contact Us for More Details</h2>
        <p className="feedback-desc">Have questions, feedback, or want to know more about our collections and offers? Fill out the form below and our team will get back to you soon!</p>
        <form className="feedback-form" action="https://formspree.io/f/xgvyrnrr" method="POST">
          <input type="text" className="feedback-input" name="name" placeholder="Your Name" required />
          <input type="email" className="feedback-input" name="email" placeholder="Your Email" required />
          <textarea className="feedback-textarea" name="message" placeholder="Your Message" rows="4" required></textarea>
          <button type="submit" className="feedback-btn">Send Message</button>
        </form>
      </section>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/men" element={<Men />} />
            <Route path='/women' element={<Women />} />
            <Route path='/kids' element={<Kids />} />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </Router>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
