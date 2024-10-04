const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');

router.get( '/random-upper-lower', workoutController.upper_lower);

module.exports = router;
