import express from "express"
import {getMonsters, editMonster, addMonster} from "../controllers/monstersControllers.js"
import auth from "../middlewares/auth.js"

const router=express.Router()

router.post("/addmonster",auth,addMonster)
router.get("/getmonsters",getMonsters)
router.put("/editmonster",editMonster)

export default router