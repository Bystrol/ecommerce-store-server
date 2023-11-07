import express, { Request, Response, Application } from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const app: Application = express()
const port = process.env.PORT || 8000
const DB_URI = process.env.DB_URI || ""

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Connected to the server" })
})

mongoose
  .connect(DB_URI)
  .then(() => {
    app.listen(port)
  })
  .catch((err) => {
    console.log(err)
  })
