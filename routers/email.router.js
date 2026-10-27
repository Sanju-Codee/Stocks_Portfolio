import email from "../controller/email.js"
import express from "express"
let mail=express.Router()
mail.post("/email",email)
export default mail