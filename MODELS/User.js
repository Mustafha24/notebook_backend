const {mongoose,Schema}=require('mongoose')
const myschema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})
const UserModel=mongoose.model("UserModel",myschema)
module.exports={UserModel}