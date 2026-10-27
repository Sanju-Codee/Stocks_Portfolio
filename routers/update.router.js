import express from "express"
import userupdate from "../controller/update.js"
import update_middleware from "../middleware/update.mid.js"
const update=express.Router()
update.post("/update/:id",update_middleware,userupdate)

export default update