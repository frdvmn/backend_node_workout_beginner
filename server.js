import 'colors'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import path from 'path'
import authRoutes from './app/auth/auth.routes.js'
import exerciseRoutes from './app/exercise/exercise.routes.js'
import { authProtect } from './app/middleware/auth.middleware.js'
import { errorHandler, notFound } from './app/middleware/error.middleware.js'
import { prisma } from './app/prisma.js'
import userRoutes from './app/user/user.routes.js'
import workoutsRoutes from './app/workout/workout.routes.js'

dotenv.config()
const app = express()

async function main() {
	process.env.NODE_ENV === 'development' && app.use(morgan('dev'))
	app.use(express.json())

	const __dirname = path.resolve()
	app.use('/uploads', express.static(path.join(__dirname, '/uploads/')))

	app.use('/api/auth', authRoutes)
	app.use('/api/users', authProtect, userRoutes)
	app.use('/api/exercises', authProtect, exerciseRoutes)
	app.use('/api/workouts', authProtect, workoutsRoutes)

	app.use(notFound)
	app.use(errorHandler)

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
