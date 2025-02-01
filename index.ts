import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db'
import authRoute from './routes/authRoute'
import questionRoute from './routes/questionRoute'
import answerRoute from './routes/answerRoute'
import scoreRoute from './routes/scoreRoute'
import { errorHandler } from "./middleware/errorHandler"; 

dotenv.config()


const app = express()
app.use(cors())
app.use(express.json())

app.use('/api',authRoute)
app.use('/api',questionRoute)
app.use('/api',answerRoute)
app.use('/api',scoreRoute)

connectDB()

app.use(errorHandler)
const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))