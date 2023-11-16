import { Router } from "express"
import {
  addNewProduct,
  getProductsByCategory,
} from "../controllers/productControllers"
import { body } from "express-validator"

const router = Router()

router.post(
  "/add",
  [
    body("name").trim().isLength({ min: 3 }),
    body("description").trim().isLength({ min: 3 }),
    body("imageUrl").isURL(),
    body("price").notEmpty(),
    body("category").notEmpty(),
  ],
  addNewProduct
)

router.get("/get/:category", getProductsByCategory)

export default router
