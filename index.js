const express=require('express');
const app=express();
const mongoose=require('mongoose');
const genres=require('./routes/genres');
const courses=require('./routes/customers');
app.use(express.json());
// mongoose.connect('mongodb://localhost/vidly').then(()=>console.log("connected to db."))
//     .catch((e)=>{console.log("couldnot connected to db..",e)});
// app.use('/api/genres/',genres);
mongoose.connect('mongodb://localhost/shopdbs').then(()=>console.log("connected to db.."))
.catch((err)=>console.log("Error arissed ",err))
app.use('/api/courses',courses);
// app.get('/api/courses/:id',(req,res)=>{
//     const course=courses.find(c=>c.id===parseInt(req.params.id));
//     if(!course)return res.status(404).send("Please check if such course is available or not..")
//     res.send(course);
   
// });
// app.post('/api/courses',(req,res)=>{
    
//     const course = {
//         id: (courses.length + 1), 
//         name: req.body.name,
//         book:req.body.book
//     };
//     courses.push(course);
//     res.send(course);
// })

// app.put('/api/courses/:id',(req,res)=>{
//     const course=courses.find(c=>c.id===parseInt(req.params.id));
//     if(!course){res.status(404).send("Please check if such course is available or not..");
//         return;    
//     }
//     course.name=req.body.name;
//     course.book=req.body.book;
//     res.send(course)

// })
// app.delete('/api/courses/:id',(req,res)=>{
//     const course=courses.find(c=>c.id===parseInt(req.params.id));
//     if(!course)return res.status(404).send("Please check if such course is available or not..");

//     const index=courses.indexOf(course);
//     courses.slice(index,1);
//     res.send(course);
// })
const port=process.env.PORT||3000;
app.listen(port,()=>{console.log(`Server is up and running ${port}`)});