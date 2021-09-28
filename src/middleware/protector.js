import Video from "../model/video"
export const userProtector = (req, res, next) =>{
   
    if(!req.session.loggedIn){
        req.flash("error", "You are not User!")
        return res.redirect("/")
    }
    next();
}
export const guessProtector = (req, res, next) => {
   
    if(req.session.loggedIn){
        req.flash("error", "You are already User.")
        return res.redirect("/")
    }
    next();
}
export const socialProtector = (req, res, next) => {
    
    if(req.session.loggedIn){
    if(req.session.user.socialOnly){
        req.flash("error", "You Joined with Social Account!")
        return res.redirect("/")
    }
    next();
}  else{
    req.flash("error", "You are not User!")
 return res.redirect("/")}
}
export const videoModifyProtector = async(req, res, next) => {
   
    const video = await Video.findById(req.params.id).populate("owner")
if(req.session.loggedIn){
    if(String(video.owner._id) !== String(req.session.user._id)){
        req.flash("error", "You are not Video Owner.")
      return  res.redirect("/")
    }
   next()
}else{
    req.flash("error", "You are not User!")
   return res.redirect("/")}
}
export const userEditProtector = (req, res, next) =>{
    
    if(req.session.loggedIn){
    if(String(req.params.id) !== String(req.session.user._id)){
        req.flash("error", "You are not correct User.")
       return res.redirect("/")
    }
    next();
}else{req.flash("error", "You are not User!")
return res.redirect("/")}}
