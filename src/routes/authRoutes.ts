import { Router } from "express"
import {
  registerUser,
  loginUser,
  checkUserAuth,
} from "../controllers/authControllers"
import { body } from "express-validator"

const router = Router()

router.post(
  "/register",
  [
    body("username")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Username must consist of minimum 3 characters"),
    body("email").isEmail().withMessage("E-mail must be valid e-mail adress"),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Password must consist of minimum 5 characters"),
    body("confirmPassword")
      .custom((value, { req }) => {
        return value === req.body.password
      })
      .withMessage("Passwords must match"),
  ],
  registerUser
)

router.post("/login", loginUser)

router.get("/check-auth", checkUserAuth)

export default router
