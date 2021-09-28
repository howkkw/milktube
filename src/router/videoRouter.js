import express from "express"
import {getWatch, getRemove, getEdit, getUpload, postUpload,postEdit, getVideoEdit
    ,postVideoEdit,
    getVideoThumbnail,
    postVideoThumbnail} from "../controller/videoCon"
import { userProtector, videoModifyProtector } from "../middleware/protector"
const videoRouter = express.Router()

videoRouter.get("/:id([0-9a-f]{24})", getWatch)
videoRouter.get("/:id([0-9a-f]{24})/remove",videoModifyProtector ,getRemove )
videoRouter.route("/upload").all(userProtector).get(getUpload).post(postUpload)
videoRouter.route("/:id([0-9a-f]{24})/edit").all(videoModifyProtector).get(getEdit).post(postEdit)
videoRouter.route("/:id([0-9a-f]{24})/edit/video").all(videoModifyProtector).get(getVideoEdit).post(postVideoEdit)
videoRouter.route("/:id([0-9a-f]{24})/edit/thumb").all(videoModifyProtector).get(getVideoThumbnail).post(postVideoThumbnail)
export default videoRouter;