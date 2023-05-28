const Product = require('../models/Product');

const getProducts = async (req, res, next) => {
  const { name, category } = req.query;
  const filter = {};

  if (name) {
    filter.name = { $regex: name, $options: 'i' };
  }
  if (category) {
    filter.category = { $regex: category, $options: 'i' };
  }
  try {
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    next(err);
  }
};

module.exports = getProducts;