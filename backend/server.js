const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();

const app = express();

// Utiliser CORS pour permettre les connexions depuis le frontend
app.use(cors());

// Middleware pour parser les requêtes en JSON
app.use(express.json());
require("dotenv").config();
console.log("Admin Secret Token chargé :", process.env.ADMIN_SECRET_TOKEN);

// Connexion à la base de données
connectDB();

// Importer les routes
const studentRoutes = require('./routes/studentRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const scheduleRoutes = require("./routes/scheduleRoutes");
 const classRouter = require('./routes/classRouter');
const teacherRoutes = require('./routes/teacherRoutes');
const statisticsRoutes = require('./routes/statisticsRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes'); // المسار إلى ملف attendanceRoutes
const teacherSchedulesRoutes = require('./routes/teacherSchedules');
const userRoutes = require("./routes/userRoutes");


// Monter les routes
app.use('/api/students', studentRoutes); // Routes pour les étudiants
app.use('/api/inventory', inventoryRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/schedule", scheduleRoutes);
 app.use('/api/classes', classRouter);
app.use('/api/teachers', teacherRoutes);
app.use('/api/statistics', statisticsRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/teacher-schedules', teacherSchedulesRoutes);
app.use("/api/users", userRoutes);


// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
