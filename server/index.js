require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const cartRoutes = require('./routes/cart');
const paymentRoutes = require('./routes/payment');

// Connect to database
connectDB();

const app = express();

// Security middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Enable CORS with specific options for production
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? process.env.FRONTEND_URL || 'https://your-frontend-domain.com'
        : ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:3001'],
    credentials: true
}));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/cart', cartRoutes);
app.use('/api/payment', paymentRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Euphoria API is running...', status: 'success' });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found', status: 'error' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: 'Something went wrong!', 
        status: 'error',
        ...(process.env.NODE_ENV === 'development' && { error: err.message })
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
}); 