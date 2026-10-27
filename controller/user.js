import User from "../models/users.model.js"
import dotenv from "dotenv"
dotenv.config()
import bcrypt from "bcrypt"
import axios from "axios"

async function emailverify(email) {
    try {
        let data = await axios.get(`https://emailreputation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_API}&email=${email}`)
        
        console.log(data.data.email_deliverability)
        return (data.data.email_deliverability.status==="deliverable")
    } catch (error) {
        console.error(error)
        return false
    }
}
async function user_regitser(req, res) {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(402).send("All fields are required")
        }

        let validEmail = await emailverify(email)
        if (!validEmail) {
            return res.status(402).send("Invalid email")
        }

        const check = await User.findOne({
            email: email
        })
        if (check) {
            return res.status(409).send("User already exits")
        }

        let salt = await bcrypt.genSalt(10)
        let hashedPassword = await bcrypt.hash(password, salt)
        const newuser = {
            name,
            email,
            hashedPassword: hashedPassword,
            createdAt: new Date()
        }
        const ress = await User.create(newuser)

        res.status(201).send("User created successfully")
        console.log(newuser)
    } catch (error) {
        console.error(error)
        res.status(500).send("Server error")
    }
}
export default user_regitser
