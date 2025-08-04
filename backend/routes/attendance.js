const express = require('express');
const Attendance = require('../models/Attendance');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/checkin', authMiddleware, async (req, res) => {
  try {
    const { photo } = req.body;

    const attendance = new Attendance({
      user: req.user.id,
      checkInTime: new Date(),
      checkInPhoto: photo,
    });

    await attendance.save();

    res.json({ message: 'Check-in recorded', attendance });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.post('/checkout/:attendanceId', authMiddleware, async (req, res) => {
  try {
    const { photo } = req.body;
    const { attendanceId } = req.params;

    const attendance = await Attendance.findById(attendanceId);

    if (!attendance) return res.status(404).json({ message: 'Attendance record not found' });

    if (attendance.user.toString() !== req.user.id) return res.status(401).json({ message: 'Unauthorized' });

    if (attendance.checkOutTime) return res.status(400).json({ message: 'Already checked out' });

    attendance.checkOutTime = new Date();
    attendance.checkOutPhoto = photo;

    await attendance.save();

    res.json({ message: 'Check-out recorded', attendance });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.get('/myattendances', authMiddleware, async (req, res) => {
  try {
    const attendances = await Attendance.find({ user: req.user.id }).sort({ checkInTime: -1 });
    res.json(attendances);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.get('/all', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  try {
    const attendances = await Attendance.find()
      .populate('user', '-password')
      .sort({ checkInTime: -1 });
    res.json(attendances);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;