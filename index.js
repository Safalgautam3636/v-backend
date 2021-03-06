const express=require('express');
const app=express();
const mongoose=require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users=require('./routes/users')
const auth=require('./routes/auth')

app.use(express.json());

app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users',users)
app.use('/api/auth',auth)

mongoose.connect('mongodb://localhost/vidly',
                    { useNewUrlParser: true ,
                    useUnifiedTopology: true,
                    useCreateIndex: true,
                    useFindAndModify: false})
    .then(()=>console.log("connected to db."))
    .catch((e)=>{console.log("couldnot connected to db..",e)});
    mongoose.set('useUnifiedTopology', true);

const port=process.env.PORT||3000;
app.listen(port,()=>{console.log(`Server is up and running ${port}`)});