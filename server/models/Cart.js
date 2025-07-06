const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  id: String,
  name: String,
  title: String,
  price: String,
  image: String,
  size: String,
  quantity: Number,
});

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [cartItemSchema],
});

module.exports = mongoose.model('Cart', cartSchema); 