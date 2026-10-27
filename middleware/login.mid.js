import Joi from "joi"

async function loginmiddle(req,res,next){
    try {
        const schema = Joi.object({
            email: Joi.string().email().max(30).required(),
            password: Joi.string().min(3).max(30).required(),
        }).unknown(true);
        let { value, error } = schema.validate(req.body)
        if (error) {
            res.status(400).send("Invalid values")        
            return;
        }
        req.body = value
        next()

    } catch (error) {
        console.log(error)
        return res.staus(500).send("Server error")
        next(error)
    }
}

export default loginmiddle