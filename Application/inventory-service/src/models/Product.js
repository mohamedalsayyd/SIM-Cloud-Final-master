const mongoose = require("mongoose");

const structure = {
  name: {
    type: String,
    required: [true, "name is required"],
    minlength: 1,
  },
  description: {
    type: String,
    required: [true, "description is required"],
    minlength: 1,
  },
  price: {
    type: Number,
    required: [true, "price is required"],
    min: [0, "price cannot be negative"],
  },
  category: {
    type: String,
    required: [true, "category is required"],
  },
  quantity: {
    type: Number,
    required: [true, "quantity is required"],
    min: [0, "quantity cannot be negative"],
  },
  imageSrc: {
    type: String,
    default: '/default.jpg',
  },
  isLatest: {
    type: Boolean,
    default: true,
  }
};

const options = {
  timestamps: true,
};

const ProductSchema = new mongoose.Schema(structure, options);
module.exports = mongoose.model("Product", ProductSchema);