// models/userModel.js
const mongoose = require('mongoose');

const subProjectSchema = new mongoose.Schema({
  template: { type: String },
  title: { type: String, required: true },
  detail: { type: String },
  startDate: { type: Date },
  completeDate: { type: Date},
  status: { type: String},
  remark: String,
  userId : String,
  projectId : String
});

subProjectSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const SubProject = mongoose.model('SubProject', subProjectSchema);
module.exports = SubProject; // ✅ CommonJS
