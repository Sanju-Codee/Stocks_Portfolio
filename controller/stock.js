import { response } from "express";
import stock from "../models/stock.model.js"
import axios from "axios"

export async function fetchdata(req, res) {
    try{
    let data = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo`)

    // let ObjectKey = Array.from(Object.keys(data.data))
    let objectValue = Array.from(Object.values(data.data))[1]
    // let newObkey = Array.from(Object.keys(objectValue))
    let newobvalue = Array.from(Object.values(objectValue))
    newobvalue.forEach(element => {
        Object.keys(element).forEach(key => {
            const newkey = key.slice(3)
            element[newkey] = element[key]
            delete element[key]

        });
    });
    const str=newobvalue
    // console.log(str)
    await stock.deleteMany({})
    await stock.insertMany(str)
    // console.log("Latest data added in db")
}catch(error){
    console.error("cron error",error)
}
}

export default async function stocks(req,res){
    await fetchdata()
    res.status(200).send("Latest data added")
} 
















// const Time_series=data.data["Time Series (5min)"]
//     if(!Time_series){
//         return res.status(400).send("Api limit reached or invalid response")
//     }
//     const Meta=data.data["Meta Data"]
//     const Data = Object.entries(Time_series).map(([time, data]) => ({
//         time,
//         open: parseFloat(data["1. open"]),
//         high: parseFloat(data["2. high"]),
//         low: parseFloat(data["3. low"]),
//         close: parseFloat(data["4. close"]),
//         volume: parseInt(data["5. volume"])
//     }));