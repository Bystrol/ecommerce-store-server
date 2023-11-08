import express, { Application } from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./routes/authRoutes"

dotenv.config()

const app: Application = express()
const port = process.env.PORT || 8000
const DB_URI = process.env.DB_URI || ""

app.use(cors())
app.use(express.json())

app.use(authRoutes)

mongoose
  .connect(DB_URI)
  .then(() => {
    app.listen(port)
  })
  .catch((err) => {
    console.log(err)
  })
