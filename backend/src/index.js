import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.routes.js'

dotenv.config()

const app = express()

const port = process.env.PORT || 6000

app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res)=>{
    res.send("Welcome to questCode")
})

app.use("/api/v1/auth", authRoutes)

app.listen(port, ()=>{
    console.log(`server is running ${port}`);
})