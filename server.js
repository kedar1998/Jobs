import express from 'express'
const app = express()

import dotenv from 'dotenv'
dotenv.config()

import 'express-async-errors'

// DATABASE
import connectDB from './db/connect.js'

// ROUTER
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'

// MIDDLEWARE
import NotFoundMiddleware from './middleware/NotFoundMiddleware.js'
import ErrorHandlerMiddleware from './middleware/error-handler.js'
import morgan from 'morgan'


if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'))
}
app.use(express.json())

// ROUTES
app.get("/api/v1", (req,res) =>{
    res.json({msg: "Testing!"})
})

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/jobs", jobsRouter)


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