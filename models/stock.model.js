import mongoose from "mongoose"

const stock_schema = mongoose.Schema({
    open: {
        type: String
    },
    high: {
        type: String
    },
    low: {
        type: String
    },
    close: {
        type: String
    },
    volume: {
        type: String
    }
})

const stock=mongoose.model("stock",stock_schema)

export default stock