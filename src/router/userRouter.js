import express from "express"
import {showProfile, myProfile, getEditProfile, postEditProfile, getPassword, postPassword,showInnerProfile,
    getEditImg, postEditImg} from "../controller/userCon"
import {userEditProtector, socialProtector} from "../middleware/protector"
const userRouter = express.Router()

userRouter.get("/:id([0-9a-f]{24})", showProfile)
userRouter.get("/:id([0-9a-f]{24})/profile", showInnerProfile)
userRouter.route("/:id([0-9a-f]{24})/edit").all(userEditProtector).get(getEditProfile).post(postEditProfile)
userRouter.route("/:id([0-9a-f]{24})/edit/password").all(userEditProtector, socialProtector).get(getPassword).post(postPassword)
userRouter.route("/:id([0-9a-f]{24})/edit/profile-image").all(userEditProtector).get(getEditImg).post(postEditImg)

export default userRouter;
