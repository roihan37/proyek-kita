// models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  businessType: { type: String, required: true },
  companyLocation: { type: String, required: true, unique: true },
  companyName: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const User = mongoose.model('User', userSchema);
module.exports = User; // ✅ CommonJS
