const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, "Please provide your name"]
    },
    email:{
        type:String,
        required:[true, "Please provide your email"],
        unique:true,
        trim:true,
        match:[/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,"Please add a valid email"]
    },
    password:{
        type:"String",
        required:[true, "Please provide your password"],
    },
    photo:{
        type:String,
        default:"A"
    },
    bio:{
        type:String,
        default:"I am a new user"
    },
    role:{
        type:String,
        enum:["user", "admin", "creator"],
        default:"user"
    },
    isVerified:{
        type:Boolean,
        default:false
    }
},{timestamps:true, minimize:true})

module.exports = mongoose.model("User", userSchema);
