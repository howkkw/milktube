import multer from "multer"

export const uploadAvatar=multer({dest:"uploads/avatar"})
export const uploadVideo=multer({dest:"uploads/video"})