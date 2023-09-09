const {NotesModel}=require('../MODELS/Notes')
const allnotes=async(req,res)=>{
    const data=await NotesModel.find({user:req.user.id})
    res.json(data)
}

const addnote=async(req,res)=>{
    const data=await NotesModel.create({
        title:req.body.title,
        description:req.body.description,
        tag:req.body.tag,
        user:req.user.id
    })
    res.json(data)
}

const updatenote=async(req,res)=>{
    const newnote={}
    const {title,description,tag}=req.body
    if(title){newnote.title=title}
    if(description){newnote.description=description}
    if(tag){newnote.tag=tag}
    let note=await NotesModel.findById(req.params.id)
    if(!note){
        res.status(404).json({
            message:"Note Not Found"
        })
    }
    if(note.user.toString()!==req.user.id){
        res.status(404).json({
            message:"Action Not Allowed"
        })
    }
    note=await NotesModel.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
    res.status(200).json({
        note
    })

}

const deletenote=async(req,res)=>{
    let note=await NotesModel.findById(req.params.id)
    if(!note){
        return res.status(404).json({
            message:"Note Not Found"
        })
    }
    if(note.user.toString()!=req.user.id){
        res.status(500).json({
            message:"Action Not Allowed"
        })        
    }
    note=await NotesModel.findByIdAndDelete(req.params.id)
    res.status(200).json({
        message:"Note was succesfully deleted"
    })
}

module.exports={allnotes,addnote,updatenote,deletenote}