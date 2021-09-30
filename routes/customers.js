const express=require('express')
const router=express.Router();
const { Customer, validate } = require("../models/customer");
router.get('/',async(req,res)=>{

    const customers=await Customer.find().sort('name')
    res.send(customers);

})
router.post('/',async(req,res)=>{

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const customer=new Customer({
        isGold:req.body.isGold,
        name:req.body.name,
        phone:req.body.phone
    });
    await customer.save()
    res.send(customer);

})

router.put('/:id',async(req,res)=>{
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const customers=await Customer.findByIdAndUpdate(
       {_id:req.params.id},{$set:{
            isGold:req.body.isGold,
            name:req.body.name,
            phone:req.body.phone
        }},
        {new:true}
    )
    res.send(customers);

})
router.delete('/:id',async(req,res)=>{
    const customers=await Customer.findByIdAndDelete(req.params.id);
    if(!customers)return res.status(404).send("The customer with the given ID was not found.");
    res.send(customers);

})

router.get('/:id',async(req,res)=>{
    const customers=await Customer.findById(req.params.id);
    if (!customers)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

    res.send(customers);

})
module.exports=router;