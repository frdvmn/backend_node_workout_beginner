import express from 'express'
import {
	createExercise,
	deleteExercise,
	readExercises,
	updateExercise
} from './exercise.controller.js'
import { createNewExerciseLog } from './log/exercise-log.controller.js'

const router = express.Router()

router.route('/').post(createExercise).get(readExercises)
router.route('/:id').put(updateExercise).delete(deleteExercise)

router.route('/log/:exerciseId').post(createNewExerciseLog)

export default router
