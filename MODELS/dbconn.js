const mongoose=require('mongoose')
const env=require('dotenv').config()
const conn=()=>{
    mongoose.connect(
    process.env.ATLAS).then(()=>{
        console.log("Connection to db was successfull")
    })
}
module.exports={conn}