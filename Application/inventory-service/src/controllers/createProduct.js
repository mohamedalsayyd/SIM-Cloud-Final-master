const Product = require('../models/Product');

const createProduct = async (req, res, next) => {
  const { name, description, price, category, quantity } = req.body;

  try {
    const product = await Product.create({
      name,
      description,
      price,
      category,
      quantity,
    });
    res.status(201).json(product);
  } catch (err) {
    next(err)
  }
};

module.exports = createProduct;