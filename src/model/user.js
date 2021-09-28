import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    username:{type:String, required:true, trim : true, unique:true, minlength:2},
    password:{type:String},
    email:{type:String, required:true, trim : true, unique : true},
    location:{type:String, trim : true},
    id:{type:String, required:true, unique:true, minlength:5},
    socialOnly:{type:Boolean, default:false, required:true},
    avatarURL:{type:String},
    videos:[{type:mongoose.Schema.Types.ObjectId, ref:"Video"}],
    introduction:{type:String, default:""},
    comment:[{type:mongoose.Schema.Types.ObjectId, ref:"Comment"}]
})

userSchema.pre("save", async function(){
    if(this.isModified("password")){
   this.password=await bcrypt.hash(this.password, 5)}
})
const User = mongoose.model("User", userSchema)

export default User