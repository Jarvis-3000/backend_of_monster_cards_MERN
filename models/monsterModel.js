import mongoose from "mongoose"

const monsterSchema=mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
        unique:true
    }
},
{
    timestamps:true
})


//to create a new monster model
const Monster=mongoose.model('monster',monsterSchema)

export default Monster
