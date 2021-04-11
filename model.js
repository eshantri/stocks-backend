const mongoose = require("mongoose");

const stockSchema = mongoose.Schema({
  symbol: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  volume: {
    type: String,
    required: true,
  },
  close: {
    type: String,
    required: true,
  },
  marketCap: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("quotes", stockSchema);
