import { Router } from "express"
import { createCheckoutSession } from "../controllers/checkoutControllers"

const router = Router()

router.post("/create-checkout-session", createCheckoutSession)

export default router
