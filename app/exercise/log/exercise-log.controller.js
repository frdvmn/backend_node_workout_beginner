import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'

// @desc		Create exercise log
// @route		POST /api/exercises/log/:exerciseId
// @access	Private
export const createNewExerciseLog = asyncHandler(async (req, res) => {
	try {
		const exerciseId = +req.params.exerciseId

		const exercise = await prisma.exercise.findUnique({
			where: {
				id: exerciseId
			}
		})

		console.log(exercise)

		if (!exercise) {
			res.status(404)
			throw new Error('Exercise not found')
		}

		const timesDefault = []

		for (let i = 0; i < exercise.times; i++) {
			timesDefault.push({
				weight: 0,
				repeat: 0
			})
		}
		const exerciseLog = await prisma.exerciseLog.create({
			data: {
				user: {
					connect: {
						id: req.user.id
					}
				},
				exercise: {
					connect: {
						id: exerciseId
					}
				},
				times: {
					createMany: {
						data: timesDefault
					}
				}
			},
			include: {
				times: true
			}
		})
		res
			.status(201)
			.json({ message: 'Exercise log created successfully', exerciseLog })
	} catch (error) {
		if (error.code === 'P2025') {
			res.status(404)
			throw new Error('Exercise not found')
		}
		throw new Error('Failed to create exercise log')
	}
})
