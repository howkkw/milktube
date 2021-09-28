import express from "express"
import {home, getJoin, getLogout, getLogin,postLogin,postJoin, getSearch, githubStart, githubFinish} from "../controller/globalCon"
import { guessProtector,userProtector } from "../middleware/protector"
const globalRouter = express.Router()


globalRouter.get("/", home)
globalRouter.route("/login").all(guessProtector).get(getLogin).post(postLogin)
globalRouter.get("/logout",userProtector,getLogout)
globalRouter.route("/join").all(guessProtector).get(getJoin).post(postJoin)
globalRouter.get("/join/githubstart",guessProtector,githubStart)
globalRouter.get("/users/githubfinish",guessProtector,githubFinish)
globalRouter.get("/search", getSearch)
export default globalRouter