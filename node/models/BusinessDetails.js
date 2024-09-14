const mongoose = require('mongoose');

const BusinessDetailsSchema = new mongoose.Schema({
    businessName: String,
    address: String,
    email: String,
    businessPhone: String,
  });
  module.exports = mongoose.model('BusinessDetails', BusinessDetailsSchema);