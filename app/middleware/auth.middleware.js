import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import { prisma } from '../prisma.js'

export const authProtect = asyncHandler(async (req, res, next) => {
	let token
	if (req.headers.authorization?.startsWith('Bearer ')) {
		token = req.headers.authorization.split(' ')[1]
		let decode
		try {
			decode = jwt.verify(token, process.env.JWT_SECRET)
		} catch {
			res.status(401)
			throw new Error('Not authorized, token failed')
		}

		const foundUser = await prisma.user.findUnique({
			where: {
				id: decode.id
			}
		})

		if (foundUser) {
			req.user = foundUser
			next()
		} else {
			res.status(401)
			throw new Error('Not authorized, token failed')
		}
	}

	if (!token) {
		res.status(401)
		throw new Error('i do not have token')
	}
})
