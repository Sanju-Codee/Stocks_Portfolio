import express from "express"
import loginuser from "../controller/login.js"
import middleuser from "../middleware/login.mid.js"
const login=express.Router()
login.get("/login",middleuser,loginuser)
export default login