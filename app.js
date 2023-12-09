import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routes/index.js'
const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }));
dotenv.config({
  path:"./.env"
})

app.use("/v1",router)

app.get("/",(req,res)=>{
  res.send("E_commerce backend server is working!!!")
})



export default app