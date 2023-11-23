import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import User from "../models/user"
import Order from "../models/order"

export const addOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const products = req.body
  const authorizationHeader = req.headers.authorization || ""
  const authToken = authorizationHeader.split(" ")[1]

  let userEmail = ""

  try {
    jwt.verify(
      authToken,
      `${process.env.AUTH_TOKEN_SECRET}`,
      function (err, decoded) {
        if (err) {
          throw new Error(err.message)
        }

        userEmail = (decoded as jwt.JwtPayload).email
      }
    )

    if (!products) {
      return res.status(422).json({ message: "No items provided" })
    }

    const user = await User.findOne({ email: userEmail })

    if (!user) {
      return res
        .status(404)
        .json({ message: "User with this email doesn't exist" })
    }

    const updatedProducts = products.map((product: any) => {
      return {
        ...product,
        productId: product.id,
      }
    })

    const order = await Order.create({
      products: updatedProducts,
      userId: user.id,
    })

    await order.save()

    res.status(200).json({ message: "Order sent successfully" })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers.authorization || ""
  const authToken = authorizationHeader.split(" ")[1]

  let userEmail = ""

  try {
    jwt.verify(
      authToken,
      `${process.env.AUTH_TOKEN_SECRET}`,
      function (err, decoded) {
        if (err) {
          throw new Error(err.message)
        }

        userEmail = (decoded as jwt.JwtPayload).email
      }
    )

    const user = await User.findOne({ email: userEmail })

    if (!user) {
      return res
        .status(404)
        .json({ message: "User with this email doesn't exist" })
    }

    const orders = await Order.find({ userId: user._id })

    res.status(200).json({ orders })
  } catch (error) {
    console.log(error)
    next(error)
  }
}
