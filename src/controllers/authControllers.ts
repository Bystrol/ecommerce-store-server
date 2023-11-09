import { Request, Response } from "express"
import { validationResult } from "express-validator"
import User from "../models/user"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Invalid credentials", errors: errors.array() })
  }

  try {
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

    return res.status(201).json({ message: "User registered" })
  } catch (error) {
    console.log(error)
    throw new Error("Something went wrong")
  }
}

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res
        .status(404)
        .json({ message: "User with this email doesn't exist" })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
      return res.status(422).json({ message: "Incorrect password" })
    }

    const authToken = jwt.sign(
      {
        email,
        password,
      },
      "JWT_SECRET",
      { expiresIn: "1h" }
    )

    return res.status(200).json({
      message: "User successfully logged in",
      authToken,
      userRole: user.role,
    })
  } catch (error) {
    console.log(error)
    throw new Error("Something went wrong")
  }
}
