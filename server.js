import 'colors'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import authRoutes from './app/auth/auth.routes.js'
import { prisma } from './app/prisma.js'

dotenv.config()
const app = express()

/*
TODO: 
ASYNC ERROR HANDLING METHOD ASYNCHANDLER EXPRESS FOR CONTROLLER

JSON WEBTOCKEN
*/

async function main() {
	process.env.NODE_ENV === 'development' && app.use(morgan('dev'))
	app.use(express.json())
	app.use('/api/auth', authRoutes)

	// Middleware для обработки ошибок
	app.use((err, req, res, next) => {
		console.error(err.stack)
		res.status(500).json({ message: 'Internal Server Error' })
	})
	const PORT = process.env.PORT || 5000

	app.listen(PORT, () => {
		console.log(
			`🚀 Server is running in ${process.env.NODE_ENV} on PORT:${PORT}`.blue
				.bold
		)
	})
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
