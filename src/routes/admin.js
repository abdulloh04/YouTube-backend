import express from "express";
import controller from "../controllers/admin_con.js"
import validations from "../middlewares/validation.js"

const router = express.Router()

router.get("/admin", controller.GET)
router.post("/admin", validations, controller.POST)
router.put("/admin", validations, controller.PUT)
router.delete("/admin/:id", controller.DELETE)

export default router