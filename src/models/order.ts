import { Schema, model } from "mongoose"

const orderSchema = new Schema({
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
      imageUrl: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      size: {
        type: String,
        required: true,
      },
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
})

export default model("Order", orderSchema)
