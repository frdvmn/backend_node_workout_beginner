import express from 'express'
import {
	createExercise,
	deleteExercise,
	readExercises,
	updateExercise
} from './exercise.controller.js'
import { createNewExerciseLog } from './log/exercise-log.controller.js'
import { getExerciseLog } from './log/get-exercise-log.controller.js'
import {
	completeExerciseLog,
	updateExerciseLog
} from './log/update-exercise-log.controller.js'

const router = express.Router()

router.route('/').post(createExercise).get(readExercises)
router.route('/:id').put(updateExercise).delete(deleteExercise)

router.route('/log/:exerciseId').post(createNewExerciseLog)
router.route('/log/:id').get(getExerciseLog)

router.route('/log/complete/:id').patch(completeExerciseLog)
router.route('/log/time/:id').put(updateExerciseLog)

export default router
