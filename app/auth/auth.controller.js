import argon2 from 'argon2'
import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
import { userResource } from '../utils/resources/user-resource.js'
import { generateToken } from './generate-token.js'

// @desc		Auth user
// @route		POST /api/auth/login
// @access	Public
export const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	if (!email || !password) {
		throw new Error('Email and password are required')
	}
	const user = await prisma.user.findUnique({
		where: {
			email
		},
		select: {
			...userResource,
			password: true
		}
	})
	const isMatchPassword = user && (await argon2.verify(user.password, password))
	if (!(user && isMatchPassword)) {
		res.status(401)
		throw new Error('Email or Password is incorrect')
	}

	const resUser = { ...user }
	delete resUser.password

	return res.json({ user: { ...resUser }, token: generateToken(user) })
})

// @desc		Register user
// @route		POST /api/auth/register
// @access	Public
export const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body
	const isUser = await prisma.user.findUnique({
		where: {
			email
		}
	})

	if (isUser) {
		throw new Error('User already exist')
	}

	const user = await prisma.user.create({
		data: {
			name,
			email,
			password: await argon2.hash(password)
		},
		select: userResource
	})

	return res.json({ user, token: generateToken(user) })
})
