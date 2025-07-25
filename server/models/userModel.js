// models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  businessType: { type: String, required: true },
  companyLocation: { type: String, required: true },
  companyName: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true,  unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verifyPasswordToken: String,
  verifyPasswordExpires: Date,
});

userSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const User = mongoose.model('User', userSchema);
module.exports = User; // ✅ CommonJS
