import express from "express";
import controller from "../controllers/home_con.js"

const router = express.Router()

router.get("/search", controller.search)
router.get("/videos/:userId", controller.videos)
router.get("/users", controller.users)

export default router