import { Router } from "express"
import { addOrder, getOrders } from "../controllers/ordersControllers"

const router = Router()

router.patch("/add", addOrder)

router.get("/get", getOrders)

export default router
