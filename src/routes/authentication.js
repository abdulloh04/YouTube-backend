import express from "express";
import controller from "../controllers/authentication_con.js"
import validations from "../middlewares/validation.js"

const router = express.Router()

router.post("/login", validations, controller.LOGIN)
router.post("/register", validations, controller.REGISTER)

export default router