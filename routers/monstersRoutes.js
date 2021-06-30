import express from "express"
import {getMonsters, editMonster, addMonster} from "../controllers/monstersControllers.js"

const router=express.Router()

router.post("/addmonster",addMonster)
router.get("/getmonsters",getMonsters)
router.put("/editmonster",editMonster)

export default router