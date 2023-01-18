const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 4,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 4,
    max: 255,
  },
  salt: {
    type: String,
    required: true,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 1024,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  portfolio: {
    type: Object,
    required: true,
    default: {
      us: [],
      mutualFunds: [],
      indianStocks: [],
    },
  },
});

module.exports = mongoose.model("User", userSchema);
