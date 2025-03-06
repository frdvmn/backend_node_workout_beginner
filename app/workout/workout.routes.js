import express from 'express'
import {
	createWorkout,
	deleteWorkout,
	readWorkout,
	readWorkouts,
	updateWorkout
} from './workout.controller.js'

const router = express.Router()

router.route('/').post(createWorkout).get(readWorkouts)
router.route('/:id').put(updateWorkout).delete(deleteWorkout)
router.route('/:id').get(readWorkout)

export default router
