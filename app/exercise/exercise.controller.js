import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

// @desc		Create exercise
// @route		POST /api/exercises
// @access	Private
export const createExercise = asyncHandler(async (req, res) => {
	try {
		const { name, times, iconPath } = req.body
		const exercise = await prisma.exercise.create({
			data: {
				name,
				times,
				iconPath
			}
		})
		res.status(201).json({ message: 'Exercise created successfully', exercise })
	} catch {
		throw new Error('Failed to create exercise')
	}
})

// @desc		Get all exercises
// @route		GET /api/exercises
// @access	Private
export const readExercises = asyncHandler(async (req, res) => {
	const exercises = await prisma.exercise.findMany({
		orderBy: {
			createdAt: 'asc'
		}
	})
	res.status(200).json({ message: 'All exercises', exercises })
})

// @desc		Update exercise
// @route		PUT /api/exercises/:id
// @access	Private
export const updateExercise = asyncHandler(async (req, res) => {
	try {
		const { name, times, iconPath } = req.body
		const exercise = await prisma.exercise.update({
			where: {
				id: +req.params.id
			},
			data: {
				name,
				times,
				iconPath
			}
		})
		res.status(200).json({ message: 'Exercise updated successfully', exercise })
	} catch (error) {
		if (error.code === 'P2025') {
			res.status(404)
			throw new Error('Exercise not found')
		}
		throw new Error('Failed to update exercise')
	}
})

// @desc		Update exercise
// @route		DELETE /api/exercises/:id
// @access	Private
export const deleteExercise = asyncHandler(async (req, res) => {
	try {
		const exercise = await prisma.exercise.delete({
			where: {
				id: +req.params.id
			}
		})
		res.status(200).json({ message: 'Exercise deleted successfully', exercise })
	} catch (error) {
		if (error.code === 'P2025') {
			res.status(404)
			throw new Error('Exercise not found')
		}
		throw new Error('Failed to delete exercise')
	}
})
