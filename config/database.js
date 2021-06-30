import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const ConnectDB=async ()=>{
    console.log("Connecting...")
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology: true,
            useCreateIndex: true,
            useNewUrlParser: true
        })
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
}   

export default ConnectDB
