import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'

// @desc		Update exercise time
// @route		PUT /api/exercises/log/time/:id
// @access	Private
export const updateExerciseLog = asyncHandler(async (req, res) => {
	try {
		const { weight, repeat, isCompleted } = req.body

		const exerciseLogTime = await prisma.exerciseTime.update({
			where: {
				id: +req.params.id
			},
			data: {
				weight,
				repeat,
				isCompleted
			}
		})

		res.json(exerciseLogTime)
	} catch (error) {
		if (error.code === 'P2025') {
			res.status(404)
			throw new Error('Exercise log time not found')
		}
		throw new Error(error.message)
	}
})

// @desc		Update status of complete exercise log
// @route		PATCH /api/exercises/log/complete/:id
// @access	Private
export const completeExerciseLog = asyncHandler(async (req, res) => {
	try {
		const { isCompleted } = req.body
		const exerciseLog = await prisma.exerciseLog.update({
			where: {
				id: +req.params.id
			},
			data: {
				isCompleted
			},
			include: {
				exercise: true
				// workout: true
			}
		})
		console.log(exerciseLog)

		res.json(exerciseLog)
	} catch (error) {
		if (error.code === 'P2025') {
			res.status(404)
			throw new Error('Exercise log not found')
		}
		throw new Error(error.message)
	}
})
