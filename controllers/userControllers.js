import User from "../models/userModel.js"

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
    
}

export const userUpdate=async(req,res)=>{
    res.status(200).json({msg:"user update"})
}

export const userLogout=async(req,res)=>{
    res.status(200).json({msg:"user logout"})
}