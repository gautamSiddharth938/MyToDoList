const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define the User schema
var todoSchema = new Schema({
    item: { type: String, required: true },
    itemType: { type: String, default: "ToDO-Item"},
    updated: { type: Date, default: Date.now }
  });


module.exports = mongoose.model('Todo', todoSchema);