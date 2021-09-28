import Video from "../model/video"
import User from "../model/user"
import Comment from "../model/comment"

export const postComment = async(req, res) => {
 const {id} = req.params
 const UserID=req.session.user._id
 const video= await Video.findById(id)
 const ownerUser=await User.findById(UserID)

 if(!video){
return res.sendStatus(400)
 
} else{
    const comment = await Comment.create({
        owner:UserID,
        video:id,
        content:req.body.commentsContent
    })
    video.comment.push(comment._id)
    ownerUser.comment.push(comment._id)
    await video.save()
    await ownerUser.save()
    return res.status(200).json({commentid:comment._id,
    ownerID:UserID,
avatarURL:ownerUser.avatarURL,
username:ownerUser.username})
}}

export const removeComment =async (req, res) => {
    
 const {id} = req.params
 const commentsID=req.body.ID
 await Comment.findByIdAndDelete(commentsID)
return res.sendStatus(200)

 

}
export const editComment = async(req, res) => {
 const {id} = req.params
 const comment=await Comment.findByIdAndUpdate(id, {
     content:req.body.EditINPUTValue
 },{new:true})
}