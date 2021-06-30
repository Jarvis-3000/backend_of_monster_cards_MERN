import express from "express"
import {userRegister, userLogin, userUpdate, userLogout} from "../controllers/userControllers.js"

const router=express.Router()


router.post("/register",userRegister)
router.post("/login",userLogin)
router.put("/update",userUpdate)
router.delete("/delete",userLogout)

export default router
