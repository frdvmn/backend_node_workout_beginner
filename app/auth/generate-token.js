import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

export const generateToken = user => {
	const payload = {
		id: user.id
	}
	const options = { expiresIn: '365d' }

	return jwt.sign(payload, process.env.JWT_SECRET, options)
}
