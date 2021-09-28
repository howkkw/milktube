import express from "express"
import {apiCon} from "../controller/videoCon"
import {postComment,
    removeComment,
    editComment,
  } from "../controller/commentCon"

const apiRouter = express.Router();

apiRouter.post("/video/:id/api", apiCon)
apiRouter.post("/video/:id/comment/write", postComment)
apiRouter.post("/video/:id/comment/delete", removeComment)
apiRouter.post("/video/:id/comment/edit", editComment)

export default apiRouter