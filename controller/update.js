import User from "../models/users.model.js"
import bcrypt from "bcrypt"

async function updateuser(req, res) {
    try {
        const { name, email, password } = req.body
        if(password) {
            let salt = await bcrypt.genSalt(10)
            let hashedPassword = await bcrypt.hash(password, salt)
            await User.findByIdAndUpdate(req.params.id, { name: name, email: email, hashedPassword: hashedPassword })
            res.status(202).send("Update successfully")
        }
        await User.findByIdAndUpdate(req.params.id, { name: name, email: email})
            res.status(202).send("Update successfully")
    } catch (error) {
        console.log(error)
        res.status(500).send("Server error")
    }
}
export default updateuser

