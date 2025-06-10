// models/userModel.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  template: { type: String },
  managementID: { type: String },
  title: { type: String, required: true },
  detail: { type: String },
  startDate: { type: Date },
  completeDate: { type: Date},
  status: { type: String},
  remark: String,
  userId : String
});

projectSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project; // ✅ CommonJS
