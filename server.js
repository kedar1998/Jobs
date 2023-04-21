import express from 'express'
const app = express()

import dotenv from 'dotenv'
dotenv.config()

import 'express-async-errors'
import authenticate from './middleware/auth.js'


// DATABASE
import connectDB from './db/connect.js'

// ROUTER
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'

// MIDDLEWARE
import NotFoundMiddleware from './middleware/NotFoundMiddleware.js'
import ErrorHandlerMiddleware from './middleware/error-handler.js'
import morgan from 'morgan'

import {dirname} from 'path'
import { fileURLToPath } from 'url'
import path from 'path'


if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'))
}

// SECURITY
import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'

app.use(express.json())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname, './client/dist')))

// ROUTES
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/jobs", authenticate, jobsRouter)

app.get('*', (req,res) =>{
    res.sendFile(path.resolve(__dirname, './client/index.html'))
})

app.use(NotFoundMiddleware)
app.use(ErrorHandlerMiddleware)

const PORT = 5000 || process.env.PORT

const start = async () =>{
    try{
        await connectDB(process.env.DATABASE)
        app.listen(PORT, () =>{
            console.log(`server running on ${PORT}`);
        })
    }
    catch(err){
        console.log(err);
    }
}

start()