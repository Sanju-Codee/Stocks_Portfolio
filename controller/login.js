import User from "../models/users.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

async function login(req, res) {
    try {
        const { email, password } = req.body;
        if(!email ||!password){
            return res.status(400).send("All fields are required")
        }

        const check = await User.findOne({ email })
        if (!check) {
            return res.status(404).send("User not found")
        }
        const match = await bcrypt.compare(password,check.hashedPassword)
        if (!match) {
            return res.status(401).send("Invalid email or password")
        }
        const token = jwt.sign({
            userId: check._id,
            email: check.email
        },
            process.env.TOKEN,
            { expiresIn: "1h" }
        )
        res.cookie("token", token, {
            httpOnly: true,        
            secure: false,       
            sameSite: "lax",       
            maxAge: 60*60*1000 
        });
        res.status(200).json({
            message: "Login successful",
            token
        })
    } catch (error) {
        console.error("login", error)
        console.log(error)
        res.status(500).send("Server error")
    }
}

export default login

