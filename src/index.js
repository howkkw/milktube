import "regenerator-runtime"
import express from "express";
import morgan from "morgan"
import globalRouter from "./router/globalRouter";
import userRouter from "./router/userRouter";
import videoRouter from "./router/videoRouter";
import apiRouter from "./router/apiRouter"
import "./db"
import session from "express-session"
import MongoStore from "connect-mongo";
import { sessionMiddleware } from "./middleware/session";
import { uploadAvatar, uploadVideo } from "./middleware/upload";
import flash from "express-flash"


const app = express();
const PORT = 3900
const handleServerListening = () => console.log(`Server is successfully Listening on http://localhost:${PORT}⚡`) 

app.use(express.json())
app.use(express.urlencoded({ extends: true}))
app.set("view engine", "pug")
app.set("views", process.cwd() + "/src/views")
app.use(morgan("tiny"))
app.use(session({
    secret:"secret",
    resave:false,
    saveUninitialized:false,
    store:MongoStore.create({mongoUrl:"mongodb://127.0.0.1:27017/wetube"})
}))
app.use(sessionMiddleware)
app.use(flash())
app.post("/user/:id([0-9a-f]{24})/edit/profile-image",uploadAvatar.single("image"))
app.post("/video/upload", uploadVideo.single("video"))
app.post("/video/:id([0-9a-f]{24})/edit/video", uploadVideo.single("video"))
app.post("/video/:id([0-9a-f]{24})/edit/thumb", uploadVideo.single("image"))
app.use("/uploads", express.static("uploads"))
app.use("/asset", express.static("asset"))
app.use("/", globalRouter)
app.use("/user", userRouter)
app.use("/video", videoRouter)
app.use("/", apiRouter)
app.listen(PORT, handleServerListening)