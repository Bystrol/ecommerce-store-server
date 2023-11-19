import { Request, Response } from "express"
import jwt from "jsonwebtoken"
require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

type Product = {
  amount: number
  color: string
  id: string
  imageUrl: string
  name: string
  price: number
  size: string
}

export const createCheckoutSession = async (req: Request, res: Response) => {
  const { currency, items } = req.body
  const authorizationHeader = req.headers.authorization || ""
  const authToken = authorizationHeader.split(" ")[1]

  try {
    jwt.verify(authToken, `${process.env.AUTH_TOKEN_SECRET}`, function (err) {
      if (err) {
        return res.status(401).json({ message: err.message })
      }
    })

    const orderedProducts = items.map((item: Product) => {
      return {
        price_data: {
          currency,
          product_data: {
            name: item.name,
            images: [item.imageUrl],
            metadata: {
              size: item.size,
              color: item.color,
            },
          },
          unit_amount_decimal: (item.price * 100).toFixed(2),
        },
        quantity: item.amount,
      }
    })

    const session = await stripe.checkout.sessions.create({
      line_items: orderedProducts,
      mode: "payment",
      success_url: `${process.env.CLIENT_DOMAIN}?success=true`,
      cancel_url: `${process.env.CLIENT_DOMAIN}?canceled=true`,
    })

    res.json({ url: session.url })
  } catch (error) {
    console.log(error)
    throw new Error("Something went wrong")
  }
}
