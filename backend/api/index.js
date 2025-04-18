const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Test variable
console.log("Admin Secret Token chargé :", process.env.ADMIN_SECRET_TOKEN);

// Connect DB
connectDB();

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Import routes
const studentRoutes = require('./routes/studentRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const scheduleRoutes = require("./routes/scheduleRoutes");
const classRouter = require('./routes/classRouter');
const teacherRoutes = require('./routes/teacherRoutes');
const statisticsRoutes = require('./routes/statisticsRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const teacherSchedulesRoutes = require('./routes/teacherSchedules');
const userRoutes = require("./routes/userRoutes");

// Mount routes
app.use('/api/students', studentRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use('/api/classes', classRouter);
app.use('/api/teachers', teacherRoutes);
app.use('/api/statistics', statisticsRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/teacher-schedules', teacherSchedulesRoutes);
app.use("/api/users", userRoutes);

// Expose the app for Vercel (no app.listen here)
module.exports = app;
