const Joi = require('joi');
const mongoose = require('mongoose');
const jwt=require('jsonwebtoken')
require('dotenv').config()
const userSchema= new mongoose.Schema(
  {
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique:true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1034
  },isAdmin:Boolean
})
userSchema.methods.generateAuthToken=function(){
  const token=jwt.sign({_id:this._id,isAdmin:this.isAdmin},process.env.KEY)
  return token
}
const User = mongoose.model('User',userSchema);


function validateUser(customer) {
  const schema = Joi.object({
    name: Joi.string()
      .min(3).max(50)
      .required(),
    email:Joi.string().min(5).max(255).required().email(),
    password:Joi.string().min(5).max(255).required()
  });

  return schema.validate(customer);
}
exports.User=User;
exports.validate = validateUser;