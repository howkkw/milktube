import User from "../model/user"
import Video from "../model/video"
import ffmpeg from "ffmpeg"
import Comment from "../model/comment"
export const getWatch = async(req, res) => {
    const id=req.params.id
    const video = await Video.findById(id).populate("owner")
    const comments = await Comment.find({video:id}).populate("owner")
    return res.render("watch", {pageTitle:`${video.title}`, video, id,comments})
}
export const getRemove = async(req, res) => {
    const id = req.params.id
    await Video.findByIdAndDelete(id)
    req.flash("info", "Successfully Removed!")
    return res.redirect("/")
}
export const getEdit = async (req, res) => {
    const id = req.params.id
    const video = await Video.findById(id)
    return res.render("edit", {pageTitle:`EDIT ${video.title}`, video})
}
export const postEdit = async(req, res) => {
    const { file,
        body:{title, Description, hashtags},
    params:{id}} = req
    if(file){
    await Video.findByIdAndUpdate(id,{
        title,
        Description,
        hashtags:hashtags.split(",").map((a) => a.startsWith("#") ? a:`#${a}`),
        path:file.location
    }, {new:true})
} else{
    await Video.findByIdAndUpdate(id,{
        title,
        Description,
        hashtags:hashtags.split(",").map((a) => a.startsWith("#") ? a:`#${a}`),
    }, {new:true})

}
    req.flash("info", "Successfully Edited!")
    return res.redirect(`/video/${id}`)
    
}
export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle:"UPLOAD"})
}
export const postUpload = async(req, res) =>{
    const { files,
        body:{title, Description, hashtags},
    session:{user}} = req
    console.log(files)
    
    const video = await Video.create({
        path:files.video[0].location,
        title,
        Description,
        thumbpath:files.image[0].location,
        hashtags:hashtags.split(",").map((a) => a.startsWith("#") ? a:`#${a}`),
        owner:user._id
    })

    req.flash("info", "Successfully Uploaded!")

    const userVideo= await User.findById(user._id)
   userVideo.videos.push(video._id)
   userVideo.save()
    return res.redirect("/")

    
}
export const getVideoEdit = (req, res) => {
    req.flash("info", "If you change Video or Thumbnail, Click the Button ")
    return res.render("videoEdit", {pageTitle:"Edit Video File"})
}
export const postVideoEdit = async (req, res) => {
    const id=req.params.id
    const file=req.file
    const updatedVideo=await Video.findByIdAndUpdate(id,{
      path:file.location
   },{new:true})
   req.flash("info", "Successfully Edited!")
       return res.redirect(`/video/${id}/edit`)
}

export const apiCon = async (req, res) => {
    const {id} = req.params
    const video = await Video.findById(id)
    video.meta.view=video.meta.view+1
    await video.save()
    
    if(!video) {
        return res.sendStatus(400)
    } 
        return res.sendStatus(200)

    
}
export const postVideoThumbnail = async (req, res) => {
    const id=req.params.id
    const file=req.file
    const updatedVideo=await Video.findByIdAndUpdate(id,{
      thumbpath:file.location
   },{new:true})
   req.flash("info", "Successfully Edited!")
       return res.redirect(`/video/${id}/edit`)
}
export const getVideoThumbnail = (req, res) => {
    return res.render("thumbnailedit", {pageTitle:"Edit Video Thumbnail"})}
