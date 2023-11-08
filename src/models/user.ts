import { Schema, model } from "mongoose"

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  cart: {
    type: Array,
    ref: "Product",
  },
})

export default model("User", userSchema)
