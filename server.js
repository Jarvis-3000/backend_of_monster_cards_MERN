import express from "express"
import monstersRouter from "./routers/monstersRoutes.js"
import userRouters from "./routers/userRouters.js"
import ConnectDB from "./config/database.js"

const app=express()

app.use(express.json())

ConnectDB()

app.use("/monsters",monstersRouter)
app.use("/user",userRouters)


const PORT=process.env.NODE_ENV || 5000

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})