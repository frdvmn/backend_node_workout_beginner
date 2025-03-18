import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'
import { addPrevValues } from './add-prev-values.util.js'
// @desc		Get exercise log
// @route		GET /api/exercises/log/:id
// @access	Private
export const getExerciseLog = asyncHandler(async (req, res) => {
	try {
		const exerciseLog = await prisma.exerciseLog.findUnique({
			where: {
				id: +req.params.id
			},
			include: {
				exercise: true,
				times: {
					orderBy: {
						id: 'asc'
					}
				}
			}
		})

		if (!exerciseLog) {
			res.status(404)
			throw new Error('Exercise log not found')
		}

		const prevExerciseLog = await prisma.exerciseLog.findFirst({
			where: {
				exerciseId: exerciseLog.exerciseId,
				userId: req.user.id,
				isCompleted: true
			},
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				times: true
			}
		})

		const newTimes = addPrevValues(exerciseLog, prevExerciseLog)

		res.status(201).json({ ...exerciseLog, times: newTimes })
	} catch (error) {
		if (error.code === 'P2025') {
			res.status(404)
			throw new Error('Exercise log not found')
		}
		throw new Error(error.message)
	}
})
