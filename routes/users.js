const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt')
const { User, validate } = require("../models/user"); 
const jwt=require('jsonwebtoken')
const _=require('lodash')
const auth=require('../middleware/auth')

require('dotenv').config()

router.get("/me",auth,async(req,res,next)=>{
   const user=await User.findById(req.user._id).select('-password')
   res.json(user);
})


router.post('/',async(req,res)=>{
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user=await User.findOne({email:req.body.email});
    if(user)
        return res.status(400).send('User already registered')
    // user=new User({
    //     name:req.body.name,
    //     email:req.body.email,
    //     password:req.body.password

    // })
    user=new User(_.pick(req.body,['name','email','password']))
    const salt=await bcrypt.genSalt(10);
    user.password=await bcrypt.hash(user.password,salt)
    await user.save();
    // const token=jwt.sign({_id:user._id},process.env.KEY)
    const token=user.generateAuthToken();
    res.header('x-auth-token',token).send(_.pick(user,['_id','name','email']))
    
});
module.exports=router;