const mongoose = require('mongoose');

const OrdersSchema = new mongoose.Schema({
  orderDate: Date,
  time: String,
  serviceType: {
    type: String,
    enum: ["wedding", "Bar Mitzvah", "engagement", "Bat mitzva", "alliance"]
  },
  customerName: String,
  phone: String,
  email:String,
  notes: String,
  file: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model('Orders', OrdersSchema);