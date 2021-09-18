const router = require('express').Router();
const workouts = require('./workoutRoutes');

router.use('/workouts', workouts);

module.exports = router;
