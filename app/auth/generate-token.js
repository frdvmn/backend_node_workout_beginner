import jwt from 'jsonwebtoken'
export const generateToken = user => {
	const payload = {
		id: user.id
	}
	const secret = 'workout'
	const options = { expiresIn: '1h' }

	return jwt.sign(payload, secret, options)
}
