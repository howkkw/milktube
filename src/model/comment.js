import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
    content:{type:String, required:true },
    owner:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    video:{type:mongoose.Schema.Types.ObjectId, ref:"Video", required:true},
    createdAt:{type:Date, default:new Date}       
})

const Comment = mongoose.model("Comment", commentSchema)

export default Comment