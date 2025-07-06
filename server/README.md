# Euphoria Server

Backend API server for the Euphoria application.

## Environment Variables Required

Create a `.env` file in the server directory with the following variables:

```env
# Database Configuration
MONGO_URI=mongodb://localhost:27017/your_database_name

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here

# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key

# Server Configuration
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
```

## For Render Deployment

1. Add all the above environment variables in your Render dashboard
2. Set the build command to: `npm install`
3. Set the start command to: `npm start`
4. Make sure to use production values for all API keys

## Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm test` - Run tests (not implemented yet)

## API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Save user's cart
- `POST /api/payment/create-payment-intent` - Create Stripe payment intent 