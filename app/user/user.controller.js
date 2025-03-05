import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
import { userResource } from '../utils/resources/user-resource.js'

// @desc		Get user profile
// @route		GET /api/users/profile
// @access	Private
export const getUserProfile = asyncHandler(async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id
		},
		select: userResource
	})
	res.json(user)
})
