const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define the User schema
var bucketSchema = new Schema({
  item: { type: String, required: true },
  itemType: { type: String, default: "Bucket-item"},
  age: { type: Number, min: 18, max: 100 },
  updated: { type: Date, default: Date.now }
});
  

// Create the User model using the userSchema
const Buck = mongoose.model('Bucket', bucketSchema);
// User.createIndexes() // don't want extra index mongodb
module.exports = Buck