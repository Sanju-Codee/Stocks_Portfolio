import express from "express"
import registerUser from "../controller/user.js"
import middleuser from "../middleware/user.mid.js"
const register=express.Router()
register.post("/register",middleuser,registerUser)
export default register