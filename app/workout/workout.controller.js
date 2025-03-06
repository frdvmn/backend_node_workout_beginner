import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

// @desc		Create workout
// @route		POST /api/workouts
// @access	Private
export const createWorkout = asyncHandler(async (req, res) => {
	try {
		const { name, exerciseIds } = req.body
		const workout = await prisma.workout.create({
			data: {
				name,
				exercises: {
					connect: exerciseIds.map(id => {
						return { id }
					})
				}
			},
			include: {
				exercises: true
			}
		})
		res.status(201).json({ message: 'Workout created successfully', workout })
	} catch (error) {
		if (error.code === 'P2025') {
			res.status(404)
			throw new Error('Exercise not found')
		}
		throw new Error('Failed to create workout')
	}
})

// @desc		Get all workouts
// @route		GET /api/workouts
// @access	Private
export const readWorkouts = asyncHandler(async (req, res) => {
	try {
		const workouts = await prisma.workout.findMany({
			orderBy: {
				createdAt: 'asc'
			},
			include: {
				exercises: true
			}
		})
		res.status(200).json({ message: 'All workouts', workouts })
	} catch (error) {
		throw new Error('Failed to create workout')
	}
})

// @desc		Get workout
// @route		GET /api/workouts
// @access	Private
export const readWorkout = asyncHandler(async (req, res) => {
	try {
		const workout = await prisma.workout.findUnique({
			where: {
				id: +req.params.id
			},
			include: {
				exercises: true
			}
		})
		if (!workout) {
			res.status(404)
			throw new Error('workout not found')
		}
		res.status(200).json(workout)
	} catch (error) {
		throw new Error('Failed to read workout')
	}
})

// @desc		Update workouts
// @route		PUT /api/workouts/:id
// @access	Private
export const updateWorkout = asyncHandler(async (req, res) => {
	try {
		const { name, exerciseIds } = req.body
		const workout = await prisma.workout.update({
			where: {
				id: +req.params.id
			},
			data: {
				name,
				exercises: {
					set: exerciseIds.map(id => {
						return { id }
					})
				}
			},
			include: {
				exercises: true
			}
		})
		res.status(200).json({ message: 'Workout updated successfully', workout })
	} catch (error) {
		console.log(error)

		if (error.code === 'P2025') {
			res.status(404)
			throw new Error('Exercise or workout not found')
		}
		throw new Error('Failed to update workout')
	}
})

// @desc		Delete workout
// @route		DELETE /api/workouts/:id
// @access	Private
export const deleteWorkout = asyncHandler(async (req, res) => {
	try {
		const workout = await prisma.workout.delete({
			where: {
				id: +req.params.id
			}
		})
		res.status(200).json({ message: 'Workout deleted successfully', workout })
	} catch (error) {
		if (error.code === 'P2025') {
			res.status(404)
			throw new Error('Workout not found')
		}
		console.log(error)

		throw new Error('Failed to delete workout')
	}
})
