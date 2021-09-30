const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt')
const { User} = require("../models/user"); 
const Joi=require('joi')
const jwt=require('jsonwebtoken')

//login authentication and   authorization
router.post('/',async(req,res)=>{

    const { error } = validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    let user=await User.findOne({email:req.body.email});
    if(!user)
        return res.status(400).send('Invalid credentials')

    const validatePassword=await bcrypt.compare(req.body.password,user.password);
    if(!validatePassword)
        return res.status(400).send('Invalid password')
    const token=user.generateAuthToken();
    
    res.send(token);
    
});
function validate(req) {
  
    const schema = Joi.object({
      email:Joi.string().min(5).max(255).required().email(),
      password:Joi.string().min(5).max(255).required()
    });
  
    return schema.validate(req);
}
module.exports=router;