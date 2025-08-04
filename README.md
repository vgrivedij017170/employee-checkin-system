Employee Check-in/out System (MERN Stack)
A fullstack MERN (MongoDB, Express, React, Node.js) application for employee check-in and check-out using pictorial capture, with admin and employee roles, attendance tracking, and profile management.

Live:
https://vgrivedij017170.github.io/employee-checkin-system or https://encr.pw/dexter12

Features

-Employee registration and login
-Admin login
-Attendance check-in and check-out using camera photo capture
-Employee profile with personal details and attendance history
-Admin dashboard to view all employees and their attendance records
-JWT-based authentication and role-based access control
-Stores data on MongoDB Atlas (free tier)
-Frontend built with React and Material UI components
-Backend REST API with Express and Mongoose
-Supports deployment of frontend to GitHub Pages and backend to services like Heroku, Render, Railway

Prerequisites:

-Node.js and npm installed
-MongoDB Atlas account and cluster created (free tier recommended)
-Optional: GitHub account for frontend deployment

Usage:

-Access frontend in browser.
-Register a new employee or login as admin using seeded credentials (admin@example.com / admin123).
-Employees can check-in/out with photo capture, and view profile and attendance history.
-Admin can view all employees and their attendance records.

Technologies Used:

-Node.js, Express.js
-MongoDB with Mongoose
-React.js with React Router v6
-Material UI for UI components
-JWT for authentication
-Axios for HTTP requests

Notes:
Photos are stored as base64 strings in MongoDB for simplicity; consider proper storage solutions for production.
The camera capture uses browser's built-in MediaDevices API; ensure HTTPS for camera access in production.

Security: 
Passwords are hashed with bcrypt, JWT tokens expire after 1 day.

This project is provided as-is for educational and demonstration purposes
