const express=require('express')
const router=express.Router();
const mongoose=require('mongoose');
const customerSchema=new mongoose.Schema({
    isGold:{
        type:Boolean,
        default:false,
        required:true
    },
    name:{
        type:String,
        required:true,
        maxlength:50,
        minlength:10
    },
    phone:{
        type:String,
        required:true,
        maxlength:10,
        minlength:10
    }

});
const Customer =mongoose.model('Customer',customerSchema);
router.get('/',async(req,res)=>{
    const customers=await Customer.find().sort('name')
    res.send(customers);

})
router.post('/',async(req,res)=>{
    const customer=new Customer({
        isGold:req.body.isGold,
        name:req.body.name,
        phone:req.body.phone
    })
    res.send(await customer.save());

})
router.put('/:id',async(req,res)=>{
    const customers=await Customer.findByIdAndUpdate(
       {_id:req.params.id},{$set:{
            isGold:req.body.isGold,
            name:req.body.name
        }},
        {new:true}
    )
    res.send(customers);

})
router.delete('/:id',async(req,res)=>{
    const customers=await Customer.findByIdAndDelete(req.params.id);
    res.send(customers);

})

router.get('/:id',async(req,res)=>{
    const customers=await Customer.findById(req.params.id);
    res.send(customers);

})
module.exports=router;