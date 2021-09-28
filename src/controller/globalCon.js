
import User from "../model/user"
import Video from "../model/video"
import bcrypt from "bcrypt"
import fetch from "node-fetch"

export const home = async(req, res) => {

    const videos=await Video.find().populate("owner").sort({createdAt:"desc"})
    
    return res.render("home", {pageTitle:"HOME", videos })
}

export const getLogin = (req, res) => {
    return res.render("login", {pageTitle:"LOGIN"})
}
export const postLogin = async (req, res) => {
    const {id, password}=req.body
    const userId= await User.findOne({id})
    if(!userId){
        req.flash("error", "Can't find ID")
        req.flash("info", "Welcome come to MILKTUBE!")
        return res.render("login", {pageTitle:"LOGIN"})
    }
    
    const passwordConfirm = await bcrypt.compare(password, userId.password)
    if(!passwordConfirm){
        req.flash("error", "Incorrect Password")
        return res.render("login", {pageTitle:"LOGIN"})
    }
    req.session.loggedIn=true    
    req.session.user=userId
    return res.redirect("/")
}

export const getLogout = (req, res) => {
    req.flash("info", "Bye Bye! I'll miss you!")
    req.session.destroy()
    return res.redirect("/")
}
export const getJoin = (req, res) => {
    req.flash("info", "Password will be Safely encrypted ")
    return res.render("join", {pageTitle:"JOIN"})
}
export const postJoin = async (req, res) => {
    const {id, email, password1,password2, location, username} = req.body
    const findID=await User.findOne({id})
    const findUsername=await User.findOne({username})
    const findEMAIL=await User.findOne({email})

    if(findID){
        req.flash("error", "ID is already Exists!")
        return res.render("join", {pageTitle:"JOIN", id, email, location, username})
    }
    if(findUsername){
        req.flash("error", "Username is already Exsits!")
        return res.render("join", {pageTitle:"JOIN", id, email, location, username})
    }
    if(findEMAIL){
        req.flash("error", "EMAIL is already Exsits!")
        return res.render("join", {pageTitle:"JOIN",id, email, location, username})
    }
    if(password1!==password2){
        req.flash("error", "Passwords are not same!")
        return res.render("join", {pageTitle:"JOIN", id, email, location, username})
    }
    const user =await User.create({
        username,
        email,
        password: password1,
        location,
        id
    })
    req.session.user=user
    req.session.loggedIn=true
    req.flash("Welcome come to MILKTUBE!")
    return res.redirect("/")

}

export const getSearch = async(req, res) => {
    const {keyword} = req.query
    let videos=[]
    const regex = new RegExp(keyword, "gi")

    if(keyword){
    videos = await Video.find({
        title : {
    $regex: new RegExp(keyword, "i")}
}).populate("owner")
}
   return res.render("search", {pageTitle:"SEARCH", videos})
}
export const githubStart = (req, res) => {
    const config = {
        client_id:process.env.CLIENT_ID,
        scope:"read:user user:email",
        allow_signup:false
    }
    const url="https://github.com/login/oauth/authorize"  
    const configURL=new URLSearchParams(config).toString()
    const finalURL=`${url}?${configURL}`
    return res.redirect(finalURL)
}
export const githubFinish = async (req, res) => {
    const url="https://github.com/login/oauth/access_token"
    const config={
        client_id:process.env.CLIENT_ID,
        client_secret:CLIENT_SECRET,
        code:req.query.code}
    const configURL=new URLSearchParams(config).toString()
    const finalURL=`${url}?${configURL}`
    const TOKEN=await(await fetch(finalURL, {method:"POST", headers:{Accept:"application/json"}})).json()
   
    if ("access_token" in TOKEN){
        const url="https://api.github.com/user"
        const {access_token}=TOKEN
        const data=await(await fetch(url, {headers:{Authorization: `token ${access_token}`}})).json()
        const emailData=await(await fetch(`${url}/emails`, {headers:{Authorization: `token ${access_token}`}})).json()
        const email=emailData.find( (email) => email.primary===true && email.verified===true)
        const realEmail=email.email
        const findEmail=await User.findOne({email:realEmail})
        if(email){
            if(!findEmail){
            const user=await User.create({
                id:`${data.login}${data.node_id}`,
                avatarURL:data.avatar_url,
                socialOnly:true,
                username:`GitHub${data.id}`,
                location:data.location,
                email:realEmail,
                password:""
            })
            req.flash("info", "Welcome come to MILKTUBE!")
            req.session.user=user
            req.session.loggedIn=true
            return res.redirect("/")
        }else{
            req.session.user=findEmail
            req.session.loggedIn=true
            req.flash("info", "You already joined to MILKTUBE!")
            return res.redirect("/")
        }
        }
    
    }
    req.flash("error", "Failed to join with Social Account.")
    return res.redirect("/")
    }
    