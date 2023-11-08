import { Request, Response } from "express"
import { validationResult } from "express-validator"
import User from "../models/user"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password, confirmPassword } = req.body
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Invalid credentials", errors: errors.array() })
  }

  const userExists = await User.findOne({ email })

  if (userExists) {
    return res
      .status(409)
      .json({ message: "User with this email already exists" })
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  const user = new User({
    username,
    email,
    password: hashedPassword,
    role: "user",
    cart: [],
  })

  await user.save()

  const authToken = jwt.sign(
    {
      username,
      email,
    },
    "ecommerce_store_register_secret",
    { expiresIn: "1h" }
  )

  return res.status(200).json({ message: "User created", authToken })
}
