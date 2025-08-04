const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

const createAdmin = async () => {
  await connectDB();

  const existingAdmin = await User.findOne({ role: 'admin' });
  if (existingAdmin) {
    console.log('Admin user already exists');
    process.exit();
  }

  const password = 'admin123'; 
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = new User({
    name: 'Admin User',
    dob: new Date('1990-01-01'),
    mobile: '0000000000',
    email: 'admin@example.com',
    password: hashedPassword,
    role: 'admin',
    photo: '',
  });

  await admin.save();
  console.log('Admin user created: admin@example.com / admin123');
  process.exit();
};

createAdmin();