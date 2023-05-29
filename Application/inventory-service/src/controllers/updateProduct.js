const Product = require('../models/Product');

const updateProduct = async (req, res, next) => {
    const { productId } = req.params;
    const { name, description, price, category, quantity } = req.body;
  
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }
  
    try {
      const productToUpdate = {};
      if (name) {
        productToUpdate.name = name;
      }
      if (description) {
        productToUpdate.description = description;
      }
      if (price) {
        productToUpdate.price = price;
      }
      if (category) {
        productToUpdate.category = category;
      }
      if (quantity) {
        productToUpdate.quantity = quantity;
      }
  
      const product = await Product.findByIdAndUpdate(
        productId,
        productToUpdate,
        { new: true }
      );
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (err) {
      next(err);
    }
  };
  
  module.exports = updateProduct;