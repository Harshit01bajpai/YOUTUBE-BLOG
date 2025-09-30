const mongoose=require("mongoose");
const { createHmac,randomBytes } = require('node:crypto');

const userSchema=  new mongoose.Schema({
      fullname:{
        type:String,
        required:true,
        unique:true
      },
      email:{
        type:String,
        required:true,
        unique:true
      },
      salt:{
        type:String,
      },
      password:{
        type:String,
        required:true,
        unique:true
      },
      profileImageUrl:{
        type:String,
        default:"/images/default.png",
      },
      role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER",
      }
},{timestamps:true}


);

userSchema.pre("save", function(next){
    const user=this;

    const salt= randomBytes(16).toString();
    const hashedPassword= createHmac('sha256', salt)
               .update(user.password)
               .digest('hex');
                   user.salt = salt; // <-- yeh line add karein
    user.password = hashedPassword;

               next();
})

userSchema.methods.matchPassword = function(password){
   const hashed=createHmac("sha256",this.salt)
   .update(password)
   .digest("hex");

   

   return this.password===hashed;
}



const User = mongoose.model("User", userSchema);
module.exports = User;
