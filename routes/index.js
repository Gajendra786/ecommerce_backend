import express from "express"
const router = express.Router()

import auth from "./auth.routes.js"
import user from "./user.routes.js"


router.use("/auth",auth)
router.use("/user",user)


export default router
