import mongoose from "mongoose"

mongoose.connect("mongodb://127.0.0.1:27017/wetube", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify:false

})


const db=mongoose.connection

db.on("error", (error) => console.log(error, "DB Error"))
db.once("open", () => console.log("DB is successfully on!⚡"))
