import express from "express"
import logoutuser from "../controller/logout.js"
const logout=express.Router()
logout.post("/logout",logoutuser)

export default logout