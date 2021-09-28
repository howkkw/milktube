import mongoose from "mongoose"

const videoSchema = new mongoose.Schema({
    title:{type:String, required:true, trim : true, minlength:5},
Description:{type:String, required:true, trim:true, minlength:10},
    hashtags:[{type:String, trim : true, required: false}],
    meta:{
        view:{type:Number, default:0},
        rating:{type:Number, default:0}
    },
    path:{type:String, required:true},
    owner:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    createdAt:{type:Date, default:new Date},
    thumbpath:{type:String},
    comment:[{type:mongoose.Schema.Types.ObjectId, ref:"Comment"}]

})

videoSchema.static("hashtagFormat", function(hashtags){
    hashtags.split(",").map((word) => word.startsWith("#") ? word:`#${word}`)
})

const Video = mongoose.model("Video", videoSchema)

export default Video