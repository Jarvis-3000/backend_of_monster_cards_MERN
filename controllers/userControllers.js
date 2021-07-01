import User from "../models/userModel.js"
import bcrypt from "bcrypt"

export const userRegister=async(req,res)=>{
    try {
        //Checking the existence of the user
        const isUser = await User.findOne({ email: req.body.email })
        if (isUser) {
            return res.status(400).json({
                message: "User Already Exists"
            })
        }

        //crating a new user
        const user = new User(req.body)
        
        // if(req.body.key==process.env.admin_key){
        //     user.isAdmin=true
        // }

        await user.save()
        res.status(201).json({msg:"Successfull Registered!!!"})
    }
    catch (err) {
        console.log(err)
        res.status(400).send({ error: err.message })
    }
}

export const userLogin=async(req,res)=>{
    try {
        console.log("logining...")
        const user = await User.findOne({ email: req.body.email })

        console.log(user)

        //to verify the password
        if (user) {
            const isPassCorrect = await bcrypt.compare(req.body.password, user.password)

            console.log("pass correct in login1 ")

            if (isPassCorrect) {
                const token = await user.generateAuthToken()
                console.log("pass correct in login2")
                return res.status(200).json({ msg:"Login Successful!!!", user, token })
            }

            return res.status(401).json({
                message: "Login Unable!"
            })
        }
        console.log("not exist")
        res.status(403).json({
            message: "User Not Registered"
        })

    }
    catch (err) {
        res.status(400).json(err)
    }
}

export const userUpdate=async(req,res)=>{
    try{
        console.log("updating...")

        const params=Object.keys(req.body)
        console.log(params)

        params.forEach(param=>{
            if(param!=="email"){
                req.user[param]=req.body[param]
            }
            else{
                console.log("saaaale maar khana hai")
            }
        })

        const user = new User(req.user)
        await user.save()
        res.status(200).json({msg:"successfully updated", user:user})
    }
    catch(err){
        res.status(400).json({err:err.message})
    }
}

export const userLogout=async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token      //for logout a specific session
        })

        await req.user.save()
        res.send("logout successfully")
    
    }
    catch(err){
        res.status(404).json({err:err.message})
    }
}





//problem occurring

// export const userUpdate=async(req,res)=>{
//     try{
//         console.log("updating...")
//         await User.updateOne({email:req.body.email},
//             {
//                 // $set:{
//                 //     firstname:req.body.firstname,
//                 //     lastname:req.body.lastname,
//                 //     email:req.body.email,
//                 //     password:req.body.password
//                 // }
//                 $set:req.body
//             },
//             (err,doc)=>{
//                 if(!err){
//                     // return res.status(200).json({msg:"successfully updated",user:doc})
//                     console.log("saved updated doc")
//                 }
//                 else{
//                     return res.status(400).json({err:err.message})
//                 }
//             }
//         )
//         const user=await User.findOne({email:req.body.email})
//         return res.status(200).json({msg:"successfully updated",user:user})
//     }
//     catch(err){
//         res.status(400).json({err:err.message})
//     }
// }