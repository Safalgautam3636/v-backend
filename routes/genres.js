const express=require('express');
const router=express.Router();
const mongoose=require('mongoose')
const genreSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    }
});
const Genre=mongoose.model('Genre',genreSchema);
router.get('/',async(req,res)=>{
    const genres=await Genre.find().sort('name');
    res.send(genres);
});
router.post('/',async(req,res)=>{
    let genre =new Genre( {
        name:req.body.name
    });
    genre=await genre.save();
    res.send(genre);
});
router.put('/:id',async(req,res)=>{
    const genre=await Genre.findByIdAndUpdate({ _id: req.params.id }, {
        $set: { name: req.body.name }
        }, { new: true });
    if(!genre){
        return res.status(404).send('The genre with given id is not valid');
    }
    res.send(genre);
})
router.delete('/:id',async(req,res)=>{
    const genre=await Genre.findByIdAndRemove({ _id: req.params.id });
    if(!genre){
        return res.status(404).send('The genre with given id is not valid')
    }
    res.send(genre);
});
router.get('/:id',async(req,res)=>{
    const genre=await Genre.findById(req.params.id);
    if(!genre){
        return res.status(404).send('The genre with given id is not valid')
    }
    res.send(genre);
});
module.exports=router;