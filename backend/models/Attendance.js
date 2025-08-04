const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  checkInTime: { type: Date, required: true },
  checkInPhoto: { type: String, required: true },
  checkOutTime: { type: Date },
  checkOutPhoto: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);