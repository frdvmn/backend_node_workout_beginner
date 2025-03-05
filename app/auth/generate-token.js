import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

export const generateToken = user => {
	const payload = {
		id: user.id
	}
	const options = { expiresIn: '1h' }

	return jwt.sign(payload, process.env.JWT_SECRET, options)
}
