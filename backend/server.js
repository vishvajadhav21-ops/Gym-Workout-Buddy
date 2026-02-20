// importing express
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const workoutRoutes = require('./routes/workoutes');
const userRoutes = require('./routes/useroutes.js')


// express app
const app = express();

app.use(express.json());

// middlewares
app.use( (req , res , next) =>{
    console.log(req.path , req.method)
    next()
    
})
      

// database connection
const connectDB = require('./databaseConnection.js');
connectDB();

// routes
app.get( '/' , (req ,res)=>{
    res.json({
        Message : "server is running"
    })
})

app.use('/api/workouts' , workoutRoutes);
app.use('/api/user' , userRoutes)

//Port Num
const Port = process.env.PORT;

// listen from request
app.listen(Port , () =>{
    console.log(`server is run on http://localhost:${Port}`);
    
})