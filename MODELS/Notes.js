const {mongoose,Schema}=require('mongoose')
const myschema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserModel"
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    tag:{
        type:String,
        default:"General"
    },
    date:{
        type:Date,
        default:Date.now()
    }
})
const NotesModel=mongoose.model("NotesModel",myschema)
module.exports={NotesModel}