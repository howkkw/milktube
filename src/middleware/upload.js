import multer from "multer"
import multerS3 from "multer-s3"
import aws from "aws-sdk"

const s3 = new aws.S3({
    credentials :{
        accessKeyId:process.env.AWS_ID,
        secretAccessKey:process.env.AWS_SECRET
    }
})
const multerUploaer= multerS3({
    s3: s3,
    bucket : "milktube",
    acl:"public-read"
})
export const uploadAvatar=multer({dest:"uploads/avatar",
storage:multerUploaer,
limits:{
    fileSize:3000000,
}

})
export const uploadVideo=multer({dest:"uploads/video",
storage:multerUploaer,
limits:{
    fileSize:10000000,
}

})