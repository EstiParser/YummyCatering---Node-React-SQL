const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema({
    userName: String,
    email: String,
    notes: String,
  });
  module.exports = mongoose.model('Notes', NotesSchema );