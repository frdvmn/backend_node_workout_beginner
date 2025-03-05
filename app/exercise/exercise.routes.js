import express from 'express'
import {
	createExercise,
	deleteExercise,
	readExercises,
	updateExercise
} from './exercise.controller.js'

const router = express.Router()

router.route('/').post(createExercise).get(readExercises)
router.route('/:id').put(updateExercise).delete(deleteExercise)

export default router
