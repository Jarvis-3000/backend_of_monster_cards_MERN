import express from "express"
import {userRegister, userLogin, userUpdate, userLogout} from "../controllers/userControllers.js"
import auth from "../middlewares/auth.js"

const router=express.Router()


router.post("/register",userRegister)
router.post("/login",userLogin)
router.put("/update",auth,(req,res)=>{
    console.log("authorized")
    res.send("authorized")
})
router.delete("/delete",userLogout)

export default router
