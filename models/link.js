const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  url: { type: String, required: true },
  shortLink: { type: String, required: true, unique: true },
  hits: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Link", linkSchema);
