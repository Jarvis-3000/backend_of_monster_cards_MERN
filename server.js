import express from "express"
import monstersRouter from "./routers/monstersRoutes.js"
import userRouters from "./routers/userRouters.js"
import ConnectDB from "./config/database.js"
import cors from "cors"

const app=express()

//enabling cors 
app.use(cors())

app.use(express.json())

//connecting database
ConnectDB()

app.use("/monsters",monstersRouter)
app.use("/user",userRouters)


const PORT=process.env.NODE_ENV || 5000

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})