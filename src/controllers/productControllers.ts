import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import User from "../models/user"
import Product from "../models/product"
import { validationResult } from "express-validator"

export const addNewProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, description, imageUrl, price, isAvailable, category } = req.body
  const authToken = req.headers.authorization?.split(" ")[1] || ""

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Validation failed", errors: errors.array() })
  }

  try {
    let email

    jwt.verify(
      authToken,
      `${process.env.AUTH_TOKEN_SECRET}`,
      (err, decoded) => {
        if (err) {
          throw new Error(err.message)
        } else {
          email = (decoded as jwt.JwtPayload).email
        }
      }
    )

    const user = await User.findOne({ email })

    if (!user) {
      return res
        .status(404)
        .json({ message: "User with this email doesn't exist" })
    }

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You don't have permission to add products" })
    }

    const product = new Product({
      name,
      description,
      imageUrl,
      price: parseFloat(price),
      isAvailable: /true/.test(isAvailable),
      category,
    })

    await product.save()

    res.status(201).json({ message: "Product added successfully" })
  } catch (error) {
    console.log(error)
    next(error)
  }
}
