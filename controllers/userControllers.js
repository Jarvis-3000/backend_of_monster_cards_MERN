import User from "../models/userModel.js"
import bcrypt from "bcrypt"

export const userRegister=async(req,res)=>{
    try {
        //Checking the existence of the user
        const isUser = await User.findOne({ email: req.body.email })
        if (isUser) {
            return res.status(201).json({
                message: "User Already Exists"
            })
        }

        //crating a new user
        const user = new User(req.body)
        
        // if(req.body.key==process.env.admin_key){
        //     user.isAdmin=true
        // }

        await user.save()
        res.status(201).json(user)
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


        //to verify the password
        if (user) {
            console.log("yes user")
            const isPassCorrect = await bcrypt.compare(req.body.password, user.password)
            console.log(req.body.password, " ", user.password)

            console.log("pass correct in login1 ")

            if (isPassCorrect) {
                const token = await user.generateAuthToken()
                console.log("pass correct in login2")
                return res.status(201).json({ user, token })
            }

            return res.status(404).json({
                message: "Unable pass not correct To login"
            })
        }

        res.status(404).json({
            message: "User not registered"
        })


    }
    catch (err) {
        res.status(400).json(err)
    }
}

export const userUpdate=async(req,res)=>{
    res.status(200).json({msg:"user update"})
}

export const userLogout=async(req,res)=>{
    res.status(200).json({msg:"user logout"})
}