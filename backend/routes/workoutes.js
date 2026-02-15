const express  = require('express');
const Workout = require('../models/workoutModel');
const { getAllWorkouts, getWorkout, createWorkout, deleteWorkout, updateWorkout } = require('../controllers/workoutController');
const router = express.Router();

/**
 * Route : /api/workouts
 * Method : GET
 * Description : Get all the workouts
 * Access : Public
 */

router.get('/' , getAllWorkouts);


/**
 * Route : /api/workouts/:id
 * Method : GET
 * Description : Get a specific workout by ID
 * Access : Public
 */

router.get('/:id' , getWorkout);

 /**
 * Route : /api/workouts/
 * Method : POST
 * Description : create a new workout
 * Access : Public
 */

router.post('/' , createWorkout );

/**
 * Route : /api/workouts/:id
 * Method : DELETE
 * Description : delete a workout by ID
 * Access : Public
 */

router.delete('/:id' , deleteWorkout)

/**
 * Route : /api/workouts/:id
 * Method : PATCH
 * Description : update a workout by ID
 * Access : Public
 */

router.patch('/:id' ,updateWorkout )

module.exports = router;