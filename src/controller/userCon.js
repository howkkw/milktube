import User from "../model/user"
import bcrypt from "bcrypt"
export const showProfile = async(req, res) => {
    const id=req.params.id
    const user=await User.findById(id).populate({
        path:"videos",
        options:{sort:{
            createdAt:"desc"
        }},
        populate:{
            path:"owner",
            model:"User"
        }
    })
    return res.render("userprofile", {pageTitle:`${user.username}'s Videos`, user, id})
}
export const showInnerProfile = async(req,res) =>{
    const id=req.params.id
    const profileUser=await User.findById(id)
    return res.render("userinnerprofile", {pageTitle:`${profileUser.username}'s Profile`, profileUser, id})
}
export const myProfile = (req, res) => {
    
    return res.render("myprofile", {pageTitle:`${res.locals.user.username}'s Profile`})
}

export const getEditProfile = (req, res) => {
    return res.render("edit-profile", {pageTitle:`Edit ${res.locals.user.username}'s Profile`})
}
export const postEditProfile = async (req, res) => {
    const {username, location,introduction} = req.body
    const id=req.session.user._id
    const user = await User.findOne({username})
    if(user){
        if(String(user._id)===String(id)){
                const updatedUser=await User.findByIdAndUpdate(id,{
                    username,
                    location,
                    introduction
                },{new:true})
                req.session.user=updatedUser
                req.flash("info", "Successfully Edited!")
                return res.redirect("/")
    }
        else{
            req.flash("error", "Username is already Exists!" )
            return res.render("edit-Profile", {pageTitle:`Edit ${res.locals.user.username}'s Profile`})
  
    }}const updatedUser=await User.findByIdAndUpdate(id,{
        username,
        location,
        introduction
    },{new:true})
    req.session.user=updatedUser
    req.flash("info", "Successfully Edited!")
    return res.redirect("/") }

export const getPassword = (req, res) =>{
    return res.render("edit-password", {pageTitle:`Edit ${res.locals.user.username}'s Password`})
}
export const postPassword = async (req, res) =>{
    const {oldPassword, password, password1} = req.body
    const oldPasswordConfirm = await bcrypt.compare(oldPassword, req.session.user.password)
    const id=req.session.user._id
    if(!oldPasswordConfirm){
        req.flash("error", "Password Incorrect")
        return res.render("edit-password", {pageTitle:`Edit ${res.locals.user.username}'s Password`})
    }else if(password !== password1){
        req.flash("error", "Passwords Confirmation failed")
        return res.render("edit-password", {pageTitle:`Edit ${res.locals.user.username}'s Password`})
    }
    const updatedUser= await User.findByIdAndUpdate(id, {
        password:await bcrypt.hash(password, 5)
    })
    req.session.user.password=updatedUser.password
    req.flash("info", "Successfully Edited!")
    return res.redirect("/")

}
export const getEditImg = (req, res) =>{
    return res.render("edit-profileimg", {pageTitle:"Edit Img"})
}
export const postEditImg = async(req, res) =>{
 const id=req.params.id
 const file=req.file
 const updatedUser=await User.findByIdAndUpdate(id,{
   avatarURL:file.location
},{new:true})
req.session.user=updatedUser
req.flash("info", "Successfully Edited!")
    return res.redirect(`/user/${id}/edit`)
}