import express from "express"
import {userRegister, userLogin, userUpdate, userLogout} from "../controllers/userControllers.js"
import auth from "../middlewares/auth.js"

const router=express.Router()


router.post("/register",userRegister)
router.post("/login",userLogin)
router.put("/update",auth,userUpdate)
router.delete("/logout",auth,userLogout)

export default router
