const express = require('express');
const { getAllSchedules, updateSchedules } = require('../controllers/scheduleController');

const router = express.Router();

// Routes
router.get('/', getAllSchedules);
router.put('/', updateSchedules);


module.exports = router;
