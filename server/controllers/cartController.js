const Cart = require('../models/Cart');

// Get the current user's cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    res.json(cart ? cart.items : []);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Save/update the current user's cart
exports.saveCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (cart) {
      cart.items = req.body.items;
      await cart.save();
    } else {
      cart = new Cart({ user: req.user.id, items: req.body.items });
      await cart.save();
    }
    res.json({ msg: 'Cart saved' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
}; 