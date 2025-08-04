Employee Check-in/out System (MERN Stack)
A fullstack MERN (MongoDB, Express, React, Node.js) application for employee check-in and check-out using pictorial capture, with admin and employee roles, attendance tracking, and profile management.

Features
Employee registration and login
Admin login
Attendance check-in and check-out using camera photo capture
Employee profile with personal details and attendance history
Admin dashboard to view all employees and their attendance records
JWT-based authentication and role-based access control
Stores data on MongoDB Atlas (free tier)
Frontend built with React and Material UI components
Backend REST API with Express and Mongoose
Supports deployment of frontend to GitHub Pages and backend to services like Heroku, Render, Railway
Folder Structure
 copy
employee-checkin-system/
 ├─ backend/               # Backend source code (Express + MongoDB)
 │   ├─ config/
 │   │   └─ db.js          # MongoDB connection
 │   ├─ middleware/
 │   │   └─ authMiddleware.js  # JWT auth middleware
 │   ├─ models/
 │   │   ├─ Attendance.js
 │   │   └─ User.js
 │   ├─ routes/
 │   │   ├─ attendance.js
 │   │   ├─ auth.js
 │   │   └─ users.js
 │   ├─ seedAdmin.js       # Script to seed an admin user
 │   ├─ server.js          # Entry point
 │   ├─ package.json
 │   └─ .env.example       # Environment variables example
 ├─ frontend/               # Frontend source code (React)
 │   ├─ public/
 │   │   └─ index.html
 │   ├─ src/
 │   │   ├─ api/
 │   │   │   └─ axiosConfig.js
 │   │   ├─ components/
 │   │   │   ├─ CameraCapture.js
 │   │   │   ├─ Clock.js
 │   │   │   └─ Navbar.js
 │   │   ├─ context/
 │   │   │   └─ AuthContext.js
 │   │   ├─ pages/
 │   │   │   ├─ AdminDashboard.js
 │   │   │   ├─ AttendanceCheck.js
 │   │   │   ├─ EmployeeProfile.js
 │   │   │   ├─ Login.js
 │   │   │   └─ Register.js
 │   │   ├─ App.js
 │   │   └─ index.js
 │   ├─ package.json
 │   └─ .env.example       # (Optional) Env example for frontend
 └─ README.md

Prerequisites:

    - Node.js and npm installed
    - MongoDB Atlas account and cluster created (free tier recommended)
    - Optional: GitHub account for frontend deployment

Setup Instructions
1. Backend Setup
 copy
bash

cd backend
npm install
cp .env.example .env
Edit .env file:
 copy
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
Replace MONGO_URI with your MongoDB Atlas connection string.

Replace JWT_SECRET with a strong secret string.

Seed initial admin user (run once):

 copy
bash

node seedAdmin.js
Run backend server:
 copy
bash

npm run dev
# or
npm start
Server will run at: http://localhost:5000

2. Frontend Setup
 copy
bash

cd ../frontend
npm install
npm start
Frontend available at: http://localhost:3000
By default, frontend API calls go to http://localhost:5000/api.
To change (for deployment), update src/api/axiosConfig.js baseURL.
3. Deployment
Frontend Deployment (GitHub Pages)
In frontend/package.json, set "homepage":
 copy
json

"homepage": "https://yourgithubusername.github.io/your-repo-name"
Install gh-pages:
 copy
bash

npm install gh-pages --save-dev
Add deployment scripts in package.json scripts:
 copy
json

"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
Deploy:
 copy
bash

npm run deploy
Frontend will be deployed to GitHub Pages at the URL in "homepage".

Backend Deployment
Deploy backend to any Node-supported cloud platform (Heroku, Render, Railway):

Make sure to set environment variables (MONGO_URI, JWT_SECRET) in your service config.
Update frontend API baseURL accordingly to your deployed backend URL.
Usage
Access frontend in browser.
Register a new employee or login as admin using seeded credentials (admin@example.com / admin123).
Employees can check-in/out with photo capture, and view profile and attendance history.
Admin can view all employees and their attendance records.
Technologies Used
Node.js, Express.js
MongoDB with Mongoose
React.js with React Router v6
Material UI for UI components
JWT for authentication
Axios for HTTP requests
Notes
Photos are stored as base64 strings in MongoDB for simplicity; consider proper storage solutions for production.
The camera capture uses browser's built-in MediaDevices API; ensure HTTPS for camera access in production.
Security: Passwords are hashed with bcrypt, JWT tokens expire after 1 day.
License
This project is provided as-is for educational and demonstration purposes
