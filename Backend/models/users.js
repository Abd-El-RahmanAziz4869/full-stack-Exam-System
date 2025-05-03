const mongoose = require("mongoose");
const bcryptjs = require('bcryptjs');
const userSchema=mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z]{3,10}(@)(gmail|yahoo)(.com)$/.test(v);
      },
      message: () => "Invalid Email",
    },
  },
  password: {
    type:String,
    required:true
  },
  role:{
    type:String,
    enum:["student","admin"],
    default:"student"
  }
});

userSchema.pre('save',async function(next){
  
  let salt=await bcryptjs.genSalt(10);
  let hashedPassword=await bcryptjs.hash(this.password,salt);
  this.password=hashedPassword;
  
  next()
})

const userModel=mongoose.model('User',userSchema)
module.exports=userModel;