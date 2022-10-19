import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routes/index.js'
import koloboxAuth from './service/koloboxAuth.js'
import error from './middleware/error.js'
import LogError from './service/error/LogError.js'
dotenv.config()

const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use(cors())
app.use(router)
app.use(error)

try {
	koloboxAuth()
		.then(() => start())
		.catch(error => console.log('Ошибка при логине ', error))

	const start = async () => {
		try {
			app.listen(PORT, () => console.log(`✅ Сервер запущен на порту ${PORT}`))
		} catch (e) {
			console.log(e)
		}
	}
} catch(e) {
	LogError(e)
}