const mongoose =require("mongoose");
const userSchema =new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    resetpasswordtoken:String,
    resetpasswordexpire: Date,

});
 module.exports=mongoose.model("User",userSchema)