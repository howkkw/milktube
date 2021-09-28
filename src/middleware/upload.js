import multer from "multer"
import multerS3 from "multer-s3"
import aws from "aws-sdk"

const s3 = new aws.S3({
    credentials :{
        accessKeyId:process.env.AWS_ID,
        secretAccessKey:process.env.AWS_SECRET
    }
})
const multerUploaderAvatar= multerS3({
    s3: s3,
    bucket : "milktube/image",
    acl:"public-read"
})
const multerUploaderVideo= multerS3({
    s3: s3,
    bucket : "milktube/video",
    acl:"public-read"
})

export const uploadAvatar=multer({dest:"uploads/avatar",
storage:multerUploaderAvatar,
limits:{
    fileSize:3000000,
}

})
export const uploadVideo=multer({dest:"uploads/video",
storage:multerUploaderVideo,
limits:{
    fileSize:10000000,
}

})