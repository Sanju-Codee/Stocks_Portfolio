import dotenv from "dotenv"
dotenv.config()

import express from "express"
import mongoose from "mongoose"
import cookieParser from "cookie-parser";
import User from "./models/users.model.js"
import cron from "node-cron"

const PORT=process.env.PORT || 1001
const app=express()
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())

//connection
mongoose.connect("mongodb://127.0.0.1:27017/stock").then(()=> console.log("MongoDB connected")).catch((error)=> console.log("Error",error))

import register from "./routers/user.router.js"
import login from "./routers/login.router.js"
import logout from "./routers/logout.router.js"
import update from "./routers/update.router.js"
import email from "./routers/email.router.js"
import stocks from "./controller/stock.js"
import {fetchdata} from "./controller/stock.js"

app.get("/api/v1/users",async (req,res)=>{
    const users=await User.find()
    res.status(200).json(users)
})
app.use("/api/v1/user",register)
app.use("/api/v1/user",login) 
app.use("/api/v1/user",logout) 
app.use("/api/v1/user",update) 
app.use("/api/v1/user",email) 
app.get("/api/v1/stocks",stocks)
cron.schedule("*/5 * * * *",async ()=>{
    console.log("Latest data fetched and updated in db")
    await fetchdata()
})

app.listen(PORT,()=>{
    console.log("Server Connected")
})