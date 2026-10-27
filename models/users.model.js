import mongoose from "mongoose"

const userschema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    hashedPassword:{
        type:String,
        required:true,
    },
    createdAt:{
        type:String
    }
})
const user_portfolio=mongoose.model("user_portfolio",userschema)
export default user_portfolio
